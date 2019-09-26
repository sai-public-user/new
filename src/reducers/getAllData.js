import { 
  REQUEST_UPDATE_DAYS,
  SUCCESS_UPDATE_DAYS,
  ERROR_UPDATE_DAYS,
  REQUEST_ROWS_DATA,
  SUCCESS_ROWS_DATA,
  ERROR_ROWS_DATA,
  SET_FILTER_DATA,
} from '../actionTypes';

// const row = {
//   "id": '',
//   "county": "Alachua County",
//   "plan_code": "H1032-124-0",
//   "organization_name": "WellCare",
//   "plan_name": "WellCare Access (HMO SNP)",
//   "product_type": "SNP",
//   "monthly_premium": "-",
//   "annual_drug_deductible": 0,
//   "drug_count": "",
//   "current_enrollees": "109",
//   "gain_or_loss": "Gain",
//   "mail_order_pt_1_30_days": "90$",
//   "mail_order_pt_1_90_days": "30$",
//   "mail_order_pt_2_30_days": "90$",
//   "mail_order_pt_2_90_days": "30$",
//   "mail_order_pt_3_30_days": "90$",
//   "mail_order_pt_3_90_days": "30$",
//   "mail_order_pt_4_30_days": "90$",
//   "mail_order_pt_4_90_days": "30$",
//   "mail_order_pt_5_30_days": "90$",
//   "mail_order_pt_5_90_days": "30$",
//   "mail_order_st_1_30_days": "90$",
//   "mail_order_st_1_90_days": "30$",
//   "mail_order_st_2_30_days": "90$",
//   "mail_order_st_2_90_days": "30$",
//   "mail_order_st_3_30_days": "90$",
//   "mail_order_st_3_90_days": "30$",
//   "mail_order_st_4_30_days": "90$",
//   "mail_order_st_4_90_days": "30$",
//   "mail_order_st_5_30_days": "90$",
//   "mail_order_st_5_90_days": "30$",
//   "retail_order_pt_1_30_days": "90$",
//   "retail_order_pt_1_90_days": "30$",
//   "retail_order_pt_2_30_days": "90$",
//   "retail_order_pt_2_90_days": "30$",
//   "retail_order_pt_3_30_days": "90$",
//   "retail_order_pt_3_90_days": "30$",
//   "retail_order_pt_4_30_days": "90$",
//   "retail_order_pt_4_90_days": "30$",
//   "retail_order_pt_5_30_days": "90$",
//   "retail_order_pt_5_90_days": "30$",
//   "retail_order_st_1_30_days": "90$",
//   "retail_order_st_1_90_days": "30$",
//   "retail_order_st_2_30_days": "90$",
//   "retail_order_st_2_90_days": "30$",
//   "retail_order_st_3_30_days": "90$",
//   "retail_order_st_3_90_days": "30$",
//   "retail_order_st_4_30_days": "90$",
//   "retail_order_st_4_90_days": "30$",
//   "retail_order_st_5_30_days": "90$",
//   "retail_order_st_5_90_days": "30$",
// };

// const rows = [];

// for(let i = 0; i < 20; i++) {
//   let data = {...row};
//   data.id = i;
//   data.monthly_premium = i + 1;
//   data.current_enrollees = i + 1 * i;
//   rows.push(data);
// }

const initalState = {
  loading: false,
  error: null,
  // headers: [
  //   { name: "County", value: "county" },
  //   { name: "Plan Code", value: "plan_code" },
  //   { name: "Organization Name", value: "organization_name" },
  //   { name: "Plan Name", value: "plan_name" },
  //   { name: "Product Type", value: "product_type" },
  //   { name: "Monthly Premium", value: "monthly_premium" },
  //   { name: "Annual Drug Deductible", value: "annual_drug_deductible" },
  //   { name: "Drug Count", value: "drug_count" },
  //   { name: "Current Enrollees", value: "current_enrollees" },
  //   { name: "Gain Or Loss", value: "gain_or_loss" },
  //   // { name: "Mail Order - PT:1 30 Days", value: 'mail_order_pt_1_30_days' },
    // { name: "Mail Order - PT:1 90 Days", value: 'mail_order_pt_1_90_days' },
    // { name: "Mail Order - PT:2 30 Days", value: 'mail_order_pt_2_30_days' },
    // { name: "Mail Order - PT:2 90 Days", value: 'mail_order_pt_2_90_days' },
    // { name: "Mail Order - PT:3 30 Days", value: 'mail_order_pt_3_30_days' },
    // { name: "Mail Order - PT:3 90 Days", value: 'mail_order_pt_3_90_days' },
    // { name: "Mail Order - PT:4 30 Days", value: 'mail_order_pt_4_30_days' },
    // { name: "Mail Order - PT:4 90 Days", value: 'mail_order_pt_4_90_days' },
    // { name: "Mail Order - PT:5 30 Days", value: 'mail_order_pt_5_30_days' },
    // { name: "Mail Order - PT:5 90 Days", value: 'mail_order_pt_5_90_days' },
    // { name: "Mail Order - ST:1 30 Days", value: 'mail_order_st_1_30_days' },
    // { name: "Mail Order - ST:1 90 Days", value: 'mail_order_st_1_90_days' },
    // { name: "Mail Order - ST:2 30 Days", value: 'mail_order_st_2_30_days' },
    // { name: "Mail Order - ST:2 90 Days", value: 'mail_order_st_2_90_days' },
    // { name: "Mail Order - ST:3 30 Days", value: 'mail_order_st_3_30_days' },
    // { name: "Mail Order - ST:3 90 Days", value: 'mail_order_st_3_90_days' },
    // { name: "Mail Order - ST:4 30 Days", value: 'mail_order_st_4_30_days' },
    // { name: "Mail Order - ST:4 90 Days", value: 'mail_order_st_4_90_days' },
    // { name: "Mail Order - ST:5 30 Days", value: 'mail_order_st_5_30_days' },
    // { name: "Mail Order - ST:5 90 Days", value: 'mail_order_st_5_90_days' },
    // { name: "Retail Order - PT:1 30 Days", value: 'retail_order_pt_1_30_days' },
    // { name: "Retail Order - PT:1 90 Days", value: 'retail_order_pt_1_90_days' },
    // { name: "Retail Order - PT:2 30 Days", value: 'retail_order_pt_2_30_days' },
    // { name: "Retail Order - PT:2 90 Days", value: 'retail_order_pt_2_90_days' },
    // { name: "Retail Order - PT:3 30 Days", value: 'retail_order_pt_3_30_days' },
    // { name: "Retail Order - PT:3 90 Days", value: 'retail_order_pt_3_90_days' },
    // { name: "Retail Order - PT:4 30 Days", value: 'retail_order_pt_4_30_days' },
    // { name: "Retail Order - PT:4 90 Days", value: 'retail_order_pt_4_90_days' },
    // { name: "Retail Order - PT:5 30 Days", value: 'retail_order_pt_5_30_days' },
    // { name: "Retail Order - PT:5 90 Days", value: 'retail_order_pt_5_90_days' },
    // { name: "Retail Order - ST:1 30 Days", value: 'retail_order_st_1_30_days' },
    // { name: "Retail Order - ST:1 90 Days", value: 'retail_order_st_1_90_days' },
    // { name: "Retail Order - ST:2 30 Days", value: 'retail_order_st_2_30_days' },
    // { name: "Retail Order - ST:2 90 Days", value: 'retail_order_st_2_90_days' },
    // { name: "Retail Order - ST:3 30 Days", value: 'retail_order_st_3_30_days' },
    // { name: "Retail Order - ST:3 90 Days", value: 'retail_order_st_3_90_days' },
    // { name: "Retail Order - ST:4 30 Days", value: 'retail_order_st_4_30_days' },
    // { name: "Retail Order - ST:4 90 Days", value: 'retail_order_st_4_90_days' },
    // { name: "Retail Order - ST:5 30 Days", value: 'retail_order_st_5_30_days' },
    // { name: "Retail Order - ST:5 90 Days", value: 'retail_order_st_5_90_days' },
    //],
    rows: [],
    headers: [
      { name: 'Prescriber Name', value: 'prescriberName' },
      { name: 'prescriberMSO', value: 'prescriberMSO' },
      { name: 'prescriberPrimaryPractice', value: 'prescriberPrimaryPractice' },
      { name: 'prescriberPrimaryAddress', value: 'prescriberPrimaryAddress' },
      // { name: 'prescriberPrimaryCounty', value: 'prescriberPrimaryCounty' },
      // { name: 'npiNumber', value: 'npiNumber' },
      // { name: 'PrimarySpeciality', value: 'PrimarySpeciality' },
      { name: 'spendPerMember', value: 'spendPerMember' },
      { name: 'genericDispensingRate', value: 'genericDispensingRate' },
      { name: 'costPerScript', value: 'costPerScript' },
      { name: 'extendedDaySuppleScriptPercentile', value: 'extendedDaySuppleScriptPercentile' },
      // { name: 'nonFormularyFillsPercentile', value: 'nonFormularyFillsPercentile' },
      { name: 'totalFills', value: 'totalFills' },
      { name: 'totalAllowed', value: 'totalAllowed' },
      // { name: 'genericEfficiencyRate', value: 'genericEfficiencyRate' },
      // { name: 'opioidFillsPercentile', value: 'opioidFillsPercentile' },
      // { name: 'preferedBrandFills', value: 'preferedBrandFills' },
      // { name: 'nonPreferredBrandFillsPercentils', value: 'nonPreferredBrandFillsPercentils' },
      // { name: 'specialityFillsPercentile', value: 'specialityFillsPercentile' },
      // { name: 'selectCareFillsPercentile', value: 'selectCareFillsPercentile' },
    ],
    // days: [ 'Retail Order', '30 Days' ],
    // maxPin: 5,
    // maxCompare: 5,
    normalize: 'nonNormalizedMetrics',
    exclude: ['select_all'],
};

const getAllData = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_UPDATE_DAYS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_UPDATE_DAYS:
      return {
        ...state,
        loading: false,
        error: null,
        days: payload,
      };
    case ERROR_UPDATE_DAYS:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
      case REQUEST_ROWS_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_ROWS_DATA:
      return {
        ...state,
        loading: false,
        error: null,
        rows: payload,
      };
    case ERROR_ROWS_DATA:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case SET_FILTER_DATA: 
    console.log(payload);
    return {
      ...state,
      exclude: [ ...payload ],
    }
    default:
      return state;
  }
}

export default getAllData;