const row = {
  "id": '',
  "county": "Alachua County",
  "plane_code": "H1032-124-0",
  "organization_name": "WellCare",
  "plane_name": "WellCare Access (HMO SNP)",
  "product_type": "SNP",
  "monthly_premium": "0",
  "annual_drug_deductible": "414",
  "drug_count": "87654321",
  "current_enrollees": "109",
  "gain_or_loss": "Gain",
  "Mail Order - PT:1 - 30": "90$",
  "Mail Order - PT:1 - 90": "30$",
  "Mail Order - PT:2 - 30": "90$",
  "Mail Order - PT:2 - 90": "30$",
  "Mail Order - PT:3 - 30": "90$",
  "Mail Order - PT:3 - 90": "30$",
  "Mail Order - PT:4 - 30": "90$",
  "Mail Order - PT:4 - 90": "30$",
  "Mail Order - PT:5 - 30": "90$",
  "Mail Order - PT:5 - 90": "30$",
  "Mail Order - ST:1 - 30": "90$",
  "Mail Order - ST:1 - 90": "30$",
  "Mail Order - ST:2 - 30": "90$",
  "Mail Order - ST:2 - 90": "30$",
  "Mail Order - ST:3 - 30": "90$",
  "Mail Order - ST:3 - 90": "30$",
  "Mail Order - ST:4 - 30": "90$",
  "Mail Order - ST:4 - 90": "30$",
  "Mail Order - ST:5 - 30": "90$",
  "Mail Order - ST:5 - 90": "30$",
  "Retail Order - PT:1 - 30": "90$",
  "Retail Order - PT:1 - 90": "30$",
  "Retail Order - PT:2 - 30": "90$",
  "Retail Order - PT:2 - 90": "30$",
  "Retail Order - PT:3 - 30": "90$",
  "Retail Order - PT:3 - 90": "30$",
  "Retail Order - PT:4 - 30": "90$",
  "Retail Order - PT:4 - 90": "30$",
  "Retail Order - PT:5 - 30": "90$",
  "Retail Order - PT:5 - 90": "30$",
  "Retail Order - ST:1 - 30": "90$",
  "Retail Order - ST:1 - 90": "30$",
  "Retail Order - ST:2 - 30": "90$",
  "Retail Order - ST:2 - 90": "30$",
  "Retail Order - ST:3 - 30": "90$",
  "Retail Order - ST:3 - 90": "30$",
  "Retail Order - ST:4 - 30": "90$",
  "Retail Order - ST:4 - 90": "30$",
  "Retail Order - ST:5 - 30": "90$",
  "Retail Order - ST:5 - 90": "30$",
};

const rows = [];

for(let i = 0; i < 20; i++) {
  let data = row;
  data.id = i;
  rows.push(data);
} 

const Data = {
    headers: [
      { name: "County", value: "county" },
      { name: "Plan Code", value: "plane_code" },
      { name: "Organization Name", value: "organization_name" },
      { name: "Plan Name", value: "plane_name" },
      { name: "Product Type", value: "product_type" },
      { name: "Monthly Premium", value: "monthly_premium" },
      { name: "Annual Drug Deductible", value: "annual_drug_deductible" },
      { name: "Drug Count", value: "drug_count" },
      { name: "Current Enrollees", value: "current_enrollees" },
      { name: "Gain Or Loss", value: "gain_or_loss" },
      { name: "30 Days", value: 'Mail Order - PT:1 - 30' },
      { name: "90 Days", value: 'Mail Order - PT:1 - 90' },
      { name: "30 Days", value: 'Mail Order - PT:2 - 30' },
      { name: "90 Days", value: 'Mail Order - PT:2 - 90' },
      { name: "30 Days", value: 'Mail Order - PT:3 - 30' },
      { name: "90 Days", value: 'Mail Order - PT:3 - 90' },
      { name: "30 Days", value: 'Mail Order - PT:4 - 30' },
      { name: "90 Days", value: 'Mail Order - PT:4 - 90' },
      { name: "30 Days", value: 'Mail Order - PT:5 - 30' },
      { name: "90 Days", value: 'Mail Order - PT:5 - 90' },
      { name: "30 Days", value: 'Mail Order - ST:1 - 30' },
      { name: "90 Days", value: 'Mail Order - ST:1 - 90' },
      { name: "30 Days", value: 'Mail Order - ST:2 - 30' },
      { name: "90 Days", value: 'Mail Order - ST:2 - 90' },
      { name: "30 Days", value: 'Mail Order - ST:3 - 30' },
      { name: "90 Days", value: 'Mail Order - ST:3 - 90' },
      { name: "30 Days", value: 'Mail Order - ST:4 - 30' },
      { name: "90 Days", value: 'Mail Order - ST:4 - 90' },
      { name: "30 Days", value: 'Mail Order - ST:5 - 30' },
      { name: "90 Days", value: 'Mail Order - ST:5 - 90' },
      { name: "30 Days", value: 'Retail Order - PT:1 - 30' },
      { name: "90 Days", value: 'Retail Order - PT:1 - 90' },
      { name: "30 Days", value: 'Retail Order - PT:2 - 30' },
      { name: "90 Days", value: 'Retail Order - PT:2 - 90' },
      { name: "30 Days", value: 'Retail Order - PT:3 - 30' },
      { name: "90 Days", value: 'Retail Order - PT:3 - 90' },
      { name: "30 Days", value: 'Retail Order - PT:4 - 30' },
      { name: "90 Days", value: 'Retail Order - PT:4 - 90' },
      { name: "30 Days", value: 'Retail Order - PT:5 - 30' },
      { name: "90 Days", value: 'Retail Order - PT:5 - 90' },
      { name: "30 Days", value: 'Retail Order - ST:1 - 30' },
      { name: "90 Days", value: 'Retail Order - ST:1 - 90' },
      { name: "30 Days", value: 'Retail Order - ST:2 - 30' },
      { name: "90 Days", value: 'Retail Order - ST:2 - 90' },
      { name: "30 Days", value: 'Retail Order - ST:3 - 30' },
      { name: "90 Days", value: 'Retail Order - ST:3 - 90' },
      { name: "30 Days", value: 'Retail Order - ST:4 - 30' },
      { name: "90 Days", value: 'Retail Order - ST:4 - 90' },
      { name: "30 Days", value: 'Retail Order - ST:5 - 30' },
      { name: "90 Days", value: 'Retail Order - ST:5 - 90' }
    ],
    "rows": rows,
  }
  

  export default Data;