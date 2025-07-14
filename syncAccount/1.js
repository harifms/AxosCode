set(accDetails, "name", apiResponse.accountName);
set(accDetails, "nickName", apiResponse.principalName);
// set(accDetails, "accountNumber", apiResponse.accountNumber);
set(accDetails, "accountCustodianStatus", apiResponse.status);
set(accDetails, "startDate", parseDate(apiResponse.openedDate, "yyyy-MM-dd"));
set(accDetails, "repCodeLink", isEmpty(repCodeBo) ? accDetails.repCodeLink : repCodeBo[0]);
set(accDetails, "ouLevel1", isEmpty(orgUnitBo) ? accDetails.ouLevel1 : orgUnitBo[0]);

let tradingPrivileges = [];

if (apiResponse.enableMargin && apiResponse.enableMargin == 'YES') {
  tradingPrivileges = concat(tradingPrivileges, 'Margin');
}

if (apiResponse.enableOptions && apiResponse.enableOptions == 'YES') {
  tradingPrivileges = concat(tradingPrivileges, 'Options');
}

set(accDetails, "tradingPrivileges", tradingPrivileges);
set(accDetails, "initialFundingSource", apiResponse.fundingFeatures ? maps.financialSourcesMap[apiResponse.fundingFeatures.fundingSource] : null);
set(accDetails, "otherInitialFundingSource", apiResponse.fundingFeatures ? apiResponse.fundingFeatures.fundingSpecifics : null);
set(accDetails, "moneyFundSweepOptIn", apiResponse.fundingFeatures ? maps.insuranceSweepMap[apiResponse.fundingFeatures.moneyFundInstructions] : null);
set(accDetails, "cashDividendOption", apiResponse.fundingFeatures ? maps.cashDividendOptionMap[apiResponse.fundingFeatures.dividendCashOptions] : null);
set(accDetails, "dividendReinvestmentOption", apiResponse.fundingFeatures ? maps.dividendReinvestmentMap[apiResponse.fundingFeatures.dividendDripOptions] : null);
set(accDetails, "annualIncome", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.annualIncomeRange] : null);
set(accDetails, "netWorthExcludingHome", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.netWorthRange] : null);
set(accDetails, "liquidAssets", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.liquidNetWorthRange] : null);
set(accDetails, "federalMarginalTaxRate", apiResponse.investmentProfile ? toString(apiResponse.investmentProfile.taxBracket) : null);
set(accDetails, "riskTolerance", apiResponse.investmentProfile ? maps.investmentRiskMap[apiResponse.investmentProfile.riskTolerance] : null);
set(accDetails, "estimatedValueOfInvestments", apiResponse.investmentProfile ? maps.incomeCategoryMap[apiResponse.investmentProfile.investmentValueRange] : null);
set(accDetails, "investmentObjective", apiResponse.investmentProfile ? maps.investmentObjectiveMap[apiResponse.investmentProfile.investmentObjective] : null);
set(accDetails, "investmentExperience", apiResponse.investmentProfile ? maps.ratingLevelMap[apiResponse.investmentProfile.investmentKnowledge] : null);
set(accDetails, "liquidityNeeds", apiResponse.investmentProfile ? maps.experienceMap[apiResponse.investmentProfile.liquidityNeeds] : null);
set(accDetails, "annualExpenses", apiResponse.investmentProfile ? apiResponse.investmentProfile.annualExpenses : 0);
set(accDetails, "specialExpenses", apiResponse.investmentProfile ? apiResponse.investmentProfile.specialExpenses : 0);
set(accDetails, "specialExpensesTimeframe", apiResponse.investmentProfile ? maps.experienceMap[apiResponse.investmentProfile.specialExpenseTimeFrame] : null);
set(accDetails, "timeHorizon", apiResponse.investmentProfile ? maps.experienceMap[apiResponse.investmentProfile.timeHorizon] : null);
set(accDetails, "optionsRiskLevel", apiResponse.optionsLevel ? maps.optionsRiskLevelMap[apiResponse.optionsLevel] : null);
set(accDetails, "advisorTradingDiscretion", apiResponse.discretion ? (apiResponse.discretion == 'FULL' ? 'Full' : 'Limited') : null);

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
  "repCodeLink",
  "ouLevel1"
];

return {
  "fields": fieldsAssigned,
  "accDetails": accDetails
};