set(accDetails, "name", apiResponse.accountName);
set(accDetails, "nickName", apiResponse.principalName);
// set(accDetails, "accountNumber", apiResponse.accountNumber);
set(accDetails, "accountCustodianStatus", apiResponse.status);
set(accDetails, "startDate", parseDate(apiResponse.openedDate, "yyyy-MM-dd"));
set(accDetails, "registrationType", isEmpty(regTypeBo) ? accDetails.registrationType : regTypeBo[0]);
set(accDetails, "repCodeLink", isEmpty(repCodeBo) ? accDetails.repCodeLink : repCodeBo[0]);

let tradingPrivileges = [];

if (apiResponse.enableMargin && apiResponse.enableMargin == 'YES') {
  tradingPrivileges = concat(tradingPrivileges, 'Margin');
}

if (apiResponse.enableOptions && apiResponse.enableOptions == 'YES') {
  tradingPrivileges = concat(tradingPrivileges, 'Options');
}

set(accDetails, "tradingPrivileges", tradingPrivileges);
set(accDetails, "initialFundingSource", apiResponse.fundingFeatures ? maps.financialSourcesMap[apiResponse.fundingFeatures.fundingSource] : "");
set(accDetails, "otherInitialFundingSource", apiResponse.fundingFeatures ? apiResponse.fundingFeatures.fundingSpecifics : "");
set(accDetails, "moneyFundSweepOptIn", apiResponse.fundingFeatures ? maps.insuranceSweepMap[apiResponse.fundingFeatures.moneyFundInstructions] : "");
set(accDetails, "cashDividendOption", apiResponse.fundingFeatures ? maps.cashDividendOptionMap[apiResponse.fundingFeatures.dividendCashOptions] : "");
set(accDetails, "dividendReinvestmentOption", apiResponse.fundingFeatures ? maps.dividendReinvestmentMap[apiResponse.fundingFeatures.dividendDripOptions] : "");
set(accDetails, "annualIncome", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.annualIncomeRange] : "");
set(accDetails, "netWorthExcludingHome", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.netWorthRange] : "");
set(accDetails, "liquidAssets", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.liquidNetWorthRange] : "");
set(accDetails, "federalMarginalTaxRate", apiResponse.investmentProfile ? toString(apiResponse.investmentProfile.taxBracket) : "");
set(accDetails, "riskTolerance", apiResponse.investmentProfile ? maps.investmentRiskMap[apiResponse.investmentProfile.riskTolerance] : "");
set(accDetails, "estimatedValueOfInvestments", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.investmentValueRange] : "");
set(accDetails, "investmentObjective", apiResponse.investmentProfile ? maps.investmentObjectiveMap[apiResponse.investmentProfile.investmentObjective] : "");
set(accDetails, "investmentExperience", apiResponse.investmentProfile ? maps.ratingLevelMap[apiResponse.investmentProfile.investmentKnowledge] : "");
set(accDetails, "liquidityNeeds", apiResponse.investmentProfile ? maps.experienceMap[apiResponse.investmentProfile.liquidityNeeds] : "");
set(accDetails, "annualExpenses", apiResponse.investmentProfile ? apiResponse.investmentProfile.annualExpenses : 0);
set(accDetails, "specialExpenses", apiResponse.investmentProfile ? apiResponse.investmentProfile.specialExpenses : 0);
set(accDetails, "specialExpensesTimeframe", apiResponse.investmentProfile ? maps.experienceMap[apiResponse.investmentProfile.specialExpenseTimeFrame] : "");
set(accDetails, "timeHorizon", apiResponse.investmentProfile ? maps.experienceMap[apiResponse.investmentProfile.timeHorizon] : "");
set(accDetails, "optionsRiskLevel", apiResponse.optionsLevel ? maps.optionsRiskLevelMap[apiResponse.optionsLevel] : "");
set(accDetails, "advisorTradingDiscretion", apiResponse.discretion ? (apiResponse.discretion == 'FULL' ? 'Full' : 'Limited') : "");

let fieldsAssigned = [
  "name",
  "nickName",
  // "accountNumber",
  "accountCustodianStatus",
  "createdAt",
  "tradingPrivileges",
  "initialFundingSource",
  "otherInitialFundingSource",
  "moneyFundSweepOptIn",
  "cashDividendOption",
  "dividendReinvestmentOption",
  "annualIncome",
  "netWorthExcludingHome",
  "liquidAssets",
  "federalMarginalTaxRate",
  "riskTolerance",
  "estimatedValueOfInvestments",
  "investmentObjective",
  "investmentExperience",
  "liquidityNeeds",
  "annualExpenses",
  "specialExpenses",
  "specialExpensesTimeframe",
  "timeHorizon",
  "optionsRiskLevel",
  "discretion",
  "registrationType",
  "repCodeLink"
];

return {
  "fields": fieldsAssigned,
  "accDetails": accDetails
};