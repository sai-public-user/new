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

const row = {
  id: "",
  prescriberName: "prescriberName",
  prescriberMSO: "prescriberMSO",
  prescriberPrimaryPractice: "prescriberPrimaryPractice",
  prescriberPrimaryAddress: "prescriberPrimaryAddress",
  prescriberPrimaryCounty: "prescriberPrimaryCounty",
  npiNumber: "npiNumber",
  PrimarySpeciality: "PrimarySpeciality",
  normalizedMetrics: {
    spendPerMember: 0,
    genericDispensingRate: 0,
    costPerScript: 0,
    extendedDaySuppleScriptPercentile: 0,
    nonFormularyFillsPercentile: 0,
    totalFills: 0,
    totalAllowed: 0,
    genericEfficiencyRate: 0,
    opioidFillsPercentile: 0,
    preferedBrandFills: 0,
    nonPreferredBrandFillsPercentils: 0,
    specialityFillsPercentile: 0,
    selectCareFillsPercentile: 0
  },
  nonNormalizedMetrics: {
    spendPerMember: 1,
    genericDispensingRate: 1,
    costPerScript: 1,
    extendedDaySuppleScriptPercentile: 1,
    nonFormularyFillsPercentile: 0,
    totalFills: 1,
    totalAllowed: 1,
    genericEfficiencyRate: 0,
    opioidFillsPercentile: 0,
    preferedBrandFills: 0,
    nonPreferredBrandFillsPercentils: 0,
    specialityFillsPercentile: 0,
    selectCareFillsPercentile: 0
  }
};

const rows = [];

for(let i = 0; i < 20; i++) {
  let data = {...row};
  data.id = i;
  rows.push(data);
} 

const Data = {
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
    //   { name: "Mail Order - PT:1 30 Days", value: 'mail_order_pt_1_30_days' },
    //   { name: "Mail Order - PT:1 90 Days", value: 'mail_order_pt_1_90_days' },
    //   { name: "Mail Order - PT:2 30 Days", value: 'mail_order_pt_2_30_days' },
    //   { name: "Mail Order - PT:2 90 Days", value: 'mail_order_pt_2_90_days' },
    //   { name: "Mail Order - PT:3 30 Days", value: 'mail_order_pt_3_30_days' },
    //   { name: "Mail Order - PT:3 90 Days", value: 'mail_order_pt_3_90_days' },
    //   { name: "Mail Order - PT:4 30 Days", value: 'mail_order_pt_4_30_days' },
    //   { name: "Mail Order - PT:4 90 Days", value: 'mail_order_pt_4_90_days' },
    //   { name: "Mail Order - PT:5 30 Days", value: 'mail_order_pt_5_30_days' },
    //   { name: "Mail Order - PT:5 90 Days", value: 'mail_order_pt_5_90_days' },
    //   { name: "Mail Order - ST:1 30 Days", value: 'mail_order_st_1_30_days' },
    //   { name: "Mail Order - ST:1 90 Days", value: 'mail_order_st_1_90_days' },
    //   { name: "Mail Order - ST:2 30 Days", value: 'mail_order_st_2_30_days' },
    //   { name: "Mail Order - ST:2 90 Days", value: 'mail_order_st_2_90_days' },
    //   { name: "Mail Order - ST:3 30 Days", value: 'mail_order_st_3_30_days' },
    //   { name: "Mail Order - ST:3 90 Days", value: 'mail_order_st_3_90_days' },
    //   { name: "Mail Order - ST:4 30 Days", value: 'mail_order_st_4_30_days' },
    //   { name: "Mail Order - ST:4 90 Days", value: 'mail_order_st_4_90_days' },
    //   { name: "Mail Order - ST:5 30 Days", value: 'mail_order_st_5_30_days' },
    //   { name: "Mail Order - ST:5 90 Days", value: 'mail_order_st_5_90_days' },
    //   { name: "Retail Order - PT:1 30 Days", value: 'retail_order_pt_1_30_days' },
    //   { name: "Retail Order - PT:1 90 Days", value: 'retail_order_pt_1_90_days' },
    //   { name: "Retail Order - PT:2 30 Days", value: 'retail_order_pt_2_30_days' },
    //   { name: "Retail Order - PT:2 90 Days", value: 'retail_order_pt_2_90_days' },
    //   { name: "Retail Order - PT:3 30 Days", value: 'retail_order_pt_3_30_days' },
    //   { name: "Retail Order - PT:3 90 Days", value: 'retail_order_pt_3_90_days' },
    //   { name: "Retail Order - PT:4 30 Days", value: 'retail_order_pt_4_30_days' },
    //   { name: "Retail Order - PT:4 90 Days", value: 'retail_order_pt_4_90_days' },
    //   { name: "Retail Order - PT:5 30 Days", value: 'retail_order_pt_5_30_days' },
    //   { name: "Retail Order - PT:5 90 Days", value: 'retail_order_pt_5_90_days' },
    //   { name: "Retail Order - ST:1 30 Days", value: 'retail_order_st_1_30_days' },
    //   { name: "Retail Order - ST:1 90 Days", value: 'retail_order_st_1_90_days' },
    //   { name: "Retail Order - ST:2 30 Days", value: 'retail_order_st_2_30_days' },
    //   { name: "Retail Order - ST:2 90 Days", value: 'retail_order_st_2_90_days' },
    //   { name: "Retail Order - ST:3 30 Days", value: 'retail_order_st_3_30_days' },
    //   { name: "Retail Order - ST:3 90 Days", value: 'retail_order_st_3_90_days' },
    //   { name: "Retail Order - ST:4 30 Days", value: 'retail_order_st_4_30_days' },
    //   { name: "Retail Order - ST:4 90 Days", value: 'retail_order_st_4_90_days' },
    //   { name: "Retail Order - ST:5 30 Days", value: 'retail_order_st_5_30_days' },
    //   { name: "Retail Order - ST:5 90 Days", value: 'retail_order_st_5_90_days' },
    // ],
    headers: [
      { name: 'prescriberName', value: 'prescribername' },
      { name: 'prescriberMSO', value: 'prescribermsO' },
      { name: 'prescriberPrimaryPractice', value: 'prescriberprimarypractice' },
      { name: 'prescriberPrimaryAddress', value: 'prescriberprimaryaddress' },
      // { name: 'prescriberPrimaryCounty', value: 'prescriberPrimaryCounty' },
      // { name: 'npiNumber', value: 'npiNumber' },
      // { name: 'PrimarySpeciality', value: 'PrimarySpeciality' },
      { name: 'spendPerMember', value: 'spendpermember' },
      { name: 'genericDispensingRate', value: 'genericdispensingrate' },
      { name: 'costPerScript', value: 'costperscript' },
      { name: 'extendedDaySuppleScriptPercentile', value: 'extendeddaysupplescriptpercentile' },
      // { name: 'nonFormularyFillsPercentile', value: 'nonFormularyFillsPercentile' },
      { name: 'totalFills', value: 'totalfills' },
      { name: 'totalAllowed', value: 'totalallowed' },
      // { name: 'genericEfficiencyRate', value: 'genericEfficiencyRate' },
      // { name: 'opioidFillsPercentile', value: 'opioidFillsPercentile' },
      // { name: 'preferedBrandFills', value: 'preferedBrandFills' },
      // { name: 'nonPreferredBrandFillsPercentils', value: 'nonPreferredBrandFillsPercentils' },
      // { name: 'specialityFillsPercentile', value: 'specialityFillsPercentile' },
      // { name: 'selectCareFillsPercentile', value: 'selectCareFillsPercentile' },
    ],
    rows,
    normalize: true,
  }
  

  export default Data;


  // const anotherData = [
  //   { countyName: 'nam1', countyId: '1', organizations: [
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '2', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '3', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '4', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '5', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '6', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '7', productType: [ {},{},{},{} ]},
  //   ]},
  //   { countyName: 'nam1', countyId: '1', organizations: [
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //   ]},
  //   { countyName: 'nam1', countyId: '1', organizations: [
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //   ]},
  //   { countyName: 'nam1', countyId: '1', organizations: [
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //   ]},
  //   { countyName: 'nam1', countyId: '1', organizations: [
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //     { organizationName: 'org1', organizationId: '1', productType: [ {},{},{},{} ]},
  //   ]}
  // ]