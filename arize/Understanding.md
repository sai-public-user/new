# Planning and Understanding of the project

---

### 1. Suggested Technology Stack

* **Source Platform:** Arize AI (`arize-otel` or Arize Python SDK / GraphQL or REST APIs)


* **Target Storage:** AWS S3 (Tandem S3 Bucket)


* **Compute / Processing:**
* *Option A (Serverless):* **AWS Lambda** (if data volumes per run fit within the 15-minute execution limit).
* *Option B (Containerized / Batch):* **AWS ECS / Fargate** or **AWS Batch** (best for heavier daily data dumps).


* **Scheduling & Orchestration:**
* **AWS EventBridge (Cron)** triggering Lambda/ECS, or orchestration via **Airflow / Prefect / AWS Step Functions** (aligned with Roman’s existing batch setup).




* **Programming & Libraries:** Python (`boto3` for AWS S3, `requests` or `arize` client, `pandas` / `pyarrow` for Parquet transformation).


* **Monitoring & Alerts:** AWS CloudWatch Alarms or Slack webhook notifications for job failures.

---

### 2. Architecture & Data Flow Diagram

```
+-----------------------------------------------------------------------------------+
|                                 1. SOURCE LAYER                                   |
|                                                                                   |
|    +-----------------------------+                                                |
|    |      Arize AI Platform      |                                                |
|    |  (GenAI Metrics / Traces)   |                                                |
|    |  *Data expires in 7 days*   |                                                |
|    +--------------+--------------+                                                |
+-------------------|---------------------------------------------------------------+
                    | API / SDK Data Pull
                    v
+-----------------------------------------------------------------------------------+
|                         2. BATCH INGESTION ORCHESTRATION                          |
|                                                                                   |
|    +-------------------------+                                                    |
|    | Amazon EventBridge /    |                                                    |
|    | Airflow Scheduler       | (Triggers on daily/weekly cron)                    |
|    +------------+------------+                                                    |
|                 |                                                                 |
|                 v                                                                 |
|    +-------------------------+                                                    |
|    | Compute Task Runner     |                                                    |
|    | (AWS Lambda / ECS Task) |                                                    |
|    +------------+------------+                                                    |
|                 |                                                                 |
|                 |-- 1. Query metrics from Arize for time window [T-24h to T]     |
|                 |-- 2. Validate, deduplicate, and flatten JSON records           |
|                 |-- 3. Convert records into columnar format (e.g., Parquet)      |
|                 +-- 4. Stream upload to Target Storage                           |
|                                                                                   |
+-------------------|---------------------------------------------------------------+
                    | Secure AWS IAM / S3 PutObject
                    v
+-----------------------------------------------------------------------------------+
|                               3. TARGET & RETENTION                               |
|                                                                                   |
|    +-------------------------------------------------------------------------+    |
|    |                      Tandem AWS S3 Bucket                               |    |
|    |  s3://tandem-arize-metrics/year=YYYY/month=MM/day=DD/metrics_*.parquet     |    |
|    +-------------------------------------------------------------------------+    |
|                                       |                                           |
|                                       v                                           |
|              +--------------------------------------------------+                 |
|              | Downstream Analytics (Athena, Snowflake, BI, etc)|                 |
|              +--------------------------------------------------+                 |
+-----------------------------------------------------------------------------------+

```

---

### Context & Current Status

The main goal right now is to secure UAT and Product access so the team has the necessary data available before starting the data ingestion pipelines. The original massive onboarding task has been broken down by Jose into smaller, manageable subtasks. Progress is currently blocked by external dependencies (waiting on access/use case IDs).

### 📝 Points to Remember

* Documentation: Keep an eye out for the Confluence link from Roman so you can review the "Tac-on Overwatch" documentation.

* Access Dependencies: The data ingestion pipelines are on hold until Roman coordinates with Chloe to get the necessary UAT and Product access, along with the use case IDs. The timeline for this is currently TBD.

* Next Steps & Guidance: Once the access blocker is cleared, Gary or Jose will be the best points of contact to figure out immediate next steps. Gary is also the primary resource for understanding the historical context of the Arize setup.

* Task Collaboration: Instead of one massive onboarding task, you'll be coordinating with Roman to help tackle the newly created subtasks that Jose split up.

### Sample Python extraction script or AWS CloudFormation/Terraform template to get the infrastructure

# Arize to Tandem S3 Data Ingestion Pipeline

This document provides the full implementation for an automated, daily batch pipeline that extracts GenAI telemetry and metrics from **Arize AI** and persists them into the **Tandem AWS S3 bucket** in partitioned Apache Parquet format.

---

## 1. Directory Structure

```text
arize-s3-pipeline/
├── src/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── handler.py
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── sam/
│   └── template.yaml
└── README.md
```

---

## 2. Source Code (`src/`)

### `src/requirements.txt`
```text
arize>=7.10.0
boto3>=1.34.0
pandas>=2.1.0
pyarrow>=14.0.0
requests>=2.31.0
```

### `src/Dockerfile`
Because `arize`, `pandas`, and `pyarrow` include compiled C/C++ extensions, packaging the Lambda function as an OCI-compliant container image guarantees reproducible builds and bypasses the 250 MB Lambda unzipped layer limit.

```dockerfile
FROM public.ecr.aws/lambda/python:3.11

# Copy dependency definition
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install dependencies into the task root
RUN pip install --no-cache-dir -r requirements.txt

# Copy handler code
COPY handler.py ${LAMBDA_TASK_ROOT}

# Set the Lambda handler entrypoint
CMD [ "handler.lambda_handler" ]
```

### `src/handler.py`
```python
import os
import io
import datetime
import logging
import json
import boto3
from botocore.exceptions import ClientError
from arize.exporter import ArizeExportClient
from arize.utils.types import Environments

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Environment configuration
ARIZE_API_KEY_SECRET_ARN = os.environ.get("ARIZE_API_KEY_SECRET_ARN")
ARIZE_API_KEY_ENV = os.environ.get("ARIZE_API_KEY")
ARIZE_SPACE_ID = os.environ["ARIZE_SPACE_ID"]
ARIZE_MODEL_ID = os.environ["ARIZE_MODEL_ID"]
TANDEM_S3_BUCKET = os.environ["TANDEM_S3_BUCKET"]
S3_PREFIX = os.environ.get("S3_PREFIX", "arize_metrics")


def get_arize_api_key() -> str:
    """Retrieves the Arize API key from Secrets Manager or environment fallback."""
    if ARIZE_API_KEY_ENV:
        return ARIZE_API_KEY_ENV

    if not ARIZE_API_KEY_SECRET_ARN:
        raise ValueError("Neither ARIZE_API_KEY nor ARIZE_API_KEY_SECRET_ARN is set.")

    secrets_client = boto3.client("secretsmanager")
    try:
        response = secrets_client.get_secret_value(SecretId=ARIZE_API_KEY_SECRET_ARN)
        secret_string = response.get("SecretString", "")
        try:
            secret_dict = json.loads(secret_string)
            return secret_dict.get("ARIZE_API_KEY", secret_string)
        except json.JSONDecodeError:
            return secret_string
    except ClientError as e:
        logger.error("Failed to retrieve secret from Secrets Manager: %s", e)
        raise


def lambda_handler(event, context):
    s3_client = boto3.client("s3")
    api_key = get_arize_api_key()

    # Define query window: previous full calendar day (UTC)
    # This guarantees data is captured before the 7-day expiration mark.
    now = datetime.datetime.now(datetime.timezone.utc)
    target_date = now - datetime.timedelta(days=1)

    start_time = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
    end_time = target_date.replace(hour=23, minute=59, second=59, microsecond=999999)

    logger.info(
        "Initiating Arize export for Space ID: %s, Model ID: %s, Window: [%s to %s]",
        ARIZE_SPACE_ID,
        ARIZE_MODEL_ID,
        start_time.isoformat(),
        end_time.isoformat(),
    )

    client = ArizeExportClient(api_key=api_key)

    try:
        df = client.export_model_to_df(
            space_id=ARIZE_SPACE_ID,
            model_id=ARIZE_MODEL_ID,
            environment=Environments.PRODUCTION,
            start_time=start_time,
            end_time=end_time,
            include_actuals=True,
        )
    except Exception as exc:
        logger.error("Error encountered while exporting data from Arize: %s", exc)
        raise

    if df is None or df.empty:
        logger.info("No records returned from Arize for date: %s", target_date.date())
        return {
            "statusCode": 200,
            "status": "NO_DATA",
            "date": str(target_date.date()),
            "records_written": 0,
        }

    logger.info("Retrieved %d records. Serializing to Apache Parquet...", len(df))

    # Serialize in-memory directly to PyArrow Parquet buffer (Snappy compressed)
    parquet_buffer = io.BytesIO()
    df.to_parquet(parquet_buffer, index=False, engine="pyarrow", compression="snappy")
    parquet_buffer.seek(0)

    # Date-partitioned S3 key structure compatible with Athena, Snowflake, and Glue
    s3_key = (
        f"{S3_PREFIX}/"
        f"model_id={ARIZE_MODEL_ID}/"
        f"year={target_date.strftime('%Y')}/"
        f"month={target_date.strftime('%m')}/"
        f"day={target_date.strftime('%d')}/"
        f"arize_export_{target_date.strftime('%Y%m%d')}_{int(now.timestamp())}.parquet"
    )

    logger.info("Writing Parquet file to s3://%s/%s", TANDEM_S3_BUCKET, s3_key)
    try:
        s3_client.put_object(
            Bucket=TANDEM_S3_BUCKET,
            Key=s3_key,
            Body=parquet_buffer.getvalue(),
            ContentType="application/octet-stream",
        )
        logger.info("Successfully uploaded object to S3.")
    except ClientError as e:
        logger.error("Failed to write object to S3 bucket %s: %s", TANDEM_S3_BUCKET, e)
        raise

    return {
        "statusCode": 200,
        "status": "SUCCESS",
        "date": str(target_date.date()),
        "records_written": len(df),
        "s3_destination": f"s3://{TANDEM_S3_BUCKET}/{s3_key}",
    }
```

---

## 3. Terraform Implementation (`terraform/`)

### `terraform/variables.tf`
```hcl
variable "aws_region" {
  type        = string
  description = "AWS region for deployment"
  default     = "us-east-1"
}

variable "tandem_s3_bucket_name" {
  type        = string
  description = "Name of the target Tandem S3 bucket where metrics will be saved"
  default     = "tandem-arize-metrics"
}

variable "arize_space_id" {
  type        = string
  description = "Arize Space Identifier"
}

variable "arize_model_id" {
  type        = string
  description = "Arize Model Identifier to export"
}

variable "schedule_cron" {
  type        = string
  description = "EventBridge cron expression (default: 02:00 AM UTC daily)"
  default     = "cron(0 2 * * ? *)"
}
```

### `terraform/main.tf`
```hcl
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. Secrets Manager entry for Arize API Key
resource "aws_secretsmanager_secret" "arize_api_key" {
  name                    = "arize/ingestion/api_key"
  recovery_window_in_days = 0
}

# 2. ECR Repository for containerized Lambda
resource "aws_ecr_repository" "lambda_repo" {
  name                 = "arize-to-s3-ingestion"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# 3. IAM Execution Role for Lambda
resource "aws_iam_role" "lambda_exec_role" {
  name = "arize-to-s3-lambda-exec-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# 4. IAM Policies (CloudWatch Logs, S3 Write, Secrets Manager Read)
resource "aws_iam_policy" "lambda_policy" {
  name        = "arize-to-s3-lambda-policy"
  description = "Permissions for writing to Tandem S3 bucket, reading Arize secret, and logging"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "CloudWatchLogging"
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Sid    = "TandemS3PutAccess"
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:AbortMultipartUpload"
        ]
        Resource = "arn:aws:s3:::${var.tandem_s3_bucket_name}/*"
      },
      {
        Sid    = "TandemS3ListAccess"
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = "arn:aws:s3:::${var.tandem_s3_bucket_name}"
      },
      {
        Sid    = "ReadArizeSecret"
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = aws_secretsmanager_secret.arize_api_key.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attach" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# 5. Lambda Function (Configured for Container Image)
resource "aws_lambda_function" "ingestion_lambda" {
  function_name = "arize-to-s3-batch-sync"
  role          = aws_iam_role.lambda_exec_role.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.lambda_repo.repository_url}:latest"
  timeout       = 600   # 10 minutes (max allowed is 900 seconds)
  memory_size   = 2048  # 2 GB for PyArrow in-memory transformation

  environment {
    variables = {
      ARIZE_API_KEY_SECRET_ARN = aws_secretsmanager_secret.arize_api_key.arn
      ARIZE_SPACE_ID           = var.arize_space_id
      ARIZE_MODEL_ID           = var.arize_model_id
      TANDEM_S3_BUCKET         = var.tandem_s3_bucket_name
      S3_PREFIX                = "arize_metrics"
    }
  }

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# 6. EventBridge Daily Scheduled Rule
resource "aws_cloudwatch_event_rule" "daily_schedule" {
  name                = "arize-ingestion-daily-rule"
  description         = "Trigger Arize to Tandem S3 ingestion daily"
  schedule_expression = var.schedule_cron
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.daily_schedule.name
  target_id = "TriggerArizeIngestionLambda"
  arn       = aws_lambda_function.ingestion_lambda.arn
}

resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ingestion_lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.daily_schedule.arn
}
```

### `terraform/outputs.tf`
```hcl
output "ecr_repository_url" {
  description = "Target URL for pushing the Docker image"
  value       = aws_ecr_repository.lambda_repo.repository_url
}

output "lambda_function_name" {
  description = "Name of deployed Lambda function"
  value       = aws_lambda_function.ingestion_lambda.function_name
}

output "secret_arn" {
  description = "ARN of Arize API key secret"
  value       = aws_secretsmanager_secret.arize_api_key.arn
}
```

---

## 4. AWS SAM Template (`sam/template.yaml`)

For teams preferring an AWS-native Serverless Application Model (SAM) deployment workflow, the equivalent configuration is provided below:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Arize to Tandem S3 Data Ingestion Pipeline

Parameters:
  TandemS3BucketName:
    Type: String
    Default: tandem-arize-metrics
    Description: Destination S3 bucket name
  ArizeSpaceId:
    Type: String
    Description: Arize Space ID
  ArizeModelId:
    Type: String
    Description: Arize Model ID
  ScheduleCron:
    Type: String
    Default: 'cron(0 2 * * ? *)'
    Description: EventBridge cron expression

Resources:
  ArizeApiKeySecret:
    Type: AWS::SecretsManager::Secret
    Properties:
      Name: arize/ingestion/api_key_sam
      Description: API key for Arize integration

  ArizeIngestionFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: arize-to-s3-ingestion-sam
      PackageType: Image
      Timeout: 600
      MemorySize: 2048
      Environment:
        Variables:
          ARIZE_API_KEY_SECRET_ARN: !Ref ArizeApiKeySecret
          ARIZE_SPACE_ID: !Ref ArizeSpaceId
          ARIZE_MODEL_ID: !Ref ArizeModelId
          TANDEM_S3_BUCKET: !Ref TandemS3BucketName
          S3_PREFIX: arize_metrics
      Policies:
        - S3CrudPolicy:
            BucketName: !Ref TandemS3BucketName
        - AWSSecretsManagerGetSecretValuePolicy:
            SecretArn: !Ref ArizeApiKeySecret
      Events:
        DailyBatchSchedule:
          Type: Schedule
          Properties:
            Schedule: !Ref ScheduleCron
            Name: ArizeDailyBatchEvent
            Description: Triggers daily data export from Arize
            Enabled: true
    Metadata:
      DockerTag: python3.11-v1
      DockerContext: ../src
      Dockerfile: Dockerfile

Outputs:
  FunctionArn:
    Description: Ingestion Lambda Function ARN
    Value: !GetAtt ArizeIngestionFunction.Arn
  SecretArn:
    Description: Secret ARN for Arize API Key
    Value: !Ref ArizeApiKeySecret
```

---

## 5. Deployment Instructions

### Option A: Deploying via Terraform

1. **Initialize Terraform:**
   ```bash
   cd terraform
   terraform init
   terraform apply -var="arize_space_id=YOUR_SPACE" -var="arize_model_id=YOUR_MODEL"
   ```

2. **Authenticate and Push the Container Image:**
   ```bash
   ECR_URL=$(terraform output -raw ecr_repository_url)
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URL

   cd ../src
   docker build -t arize-to-s3:latest .
   docker tag arize-to-s3:latest $ECR_URL:latest
   docker push $ECR_URL:latest
   ```

3. **Update Secret Value in AWS Secrets Manager:**
   ```bash
   SECRET_ARN=$(terraform -chdir=../terraform output -raw secret_arn)
   aws secretsmanager put-secret-value \
     --secret-id "$SECRET_ARN" \
     --secret-string '{"ARIZE_API_KEY":"your_actual_arize_key_here"}'
   ```

4. **Test Run:**
   ```bash
   LAMBDA_NAME=$(terraform -chdir=../terraform output -raw lambda_function_name)
   aws lambda invoke --function-name "$LAMBDA_NAME" --payload '{}' response.json
   cat response.json
   ```

---

### Option B: Deploying via AWS SAM

1. **Build and Deploy:**
   ```bash
   cd sam
   sam build
   sam deploy --guided
   ```
2. **Update the created Secrets Manager secret** with your `ARIZE_API_KEY` via the AWS Console or AWS CLI.

