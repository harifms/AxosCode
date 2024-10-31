let Account = account;

set(Account, "primaryOwner.owner.mailingAddress", extendedAccount.primaryOwner.owner.mailingAddress);
set(Account, "primaryOwner.owner.legalAddress", extendedAccount.primaryOwner.owner.legalAddress);
if (!Account.primaryOwner.trustedContactInfoDeclined && extendedAccount.primaryOwner.trustedContact != null) {
  set(Account, "primaryOwner.trustedContact", extendedAccount.primaryOwner.trustedContact);  
  set(Account, "primaryOwner.trustedContact.legalAddress", extendedAccount.primaryOwner.trustedContact.legalAddress);
}
set(Account, "primaryOwner.owner.previousLegalAddress", extendedAccount.primaryOwner.owner.previousLegalAddress);
set(Account, "primaryOwner.owner.employerAddress", extendedAccount.primaryOwner.owner.employerAddress);
set(Account, "primaryOwner.owner.proofOfIdentity", extendedAccount.primaryOwner.owner.proofOfIdentity);
set(Account, "primaryOwner.owner.regulatoryDisclosuresV0", extendedAccount.primaryOwner.owner.regulatoryDisclosuresV0);

let accountTypesMap = {
    "Individual": "INDIVIDUAL",
    "Individual TOD": "INDIVIDUAL",
    "Traditional IRA": "IRA_TRADITIONAL",
    "Roth IRA": "IRA_ROTH",
    "Simple IRA": "IRA_SIMPLE",
    "SEP IRA": "IRA_SEP",
    "Community Property": "JOINT_COMMUNITY_PROPERTY",
    "Community Property with Rights of Survivorship": "JOINT_COMMUNITY_PROPERTY_WITH_ROS",
    "Joint Tenants with Rights of Survivorship": "JOINT_TENANTS_WITH_ROS",
    "Tenants by Entirety": "JOINT_TENANTS_BY_ENTIRETY",
    "Tenants in Common": "JOINT_TENANTS_IN_COMMON",
    "Irrevocable Trust": "TRUST_IRREVOCABLE",
    "Revocable Trust": "TRUST_REVOCABLE"
};
set(Account, "registrationType", accountTypesMap[Account.registrationType] || accountTypesMap[registrationType]);
if (Account.primaryOwner.owner.middleName){
	set(Account, "primaryOwner.owner.middleName", substring(Account.primaryOwner.owner.middleName, 0, 1));
}

let genderTypesMap = {
    "Male": "MALE",
    "Female": "FEMALE",
	"No Answer": "NO_ANSWER"
};
set(Account, "primaryOwner.owner.gender", genderTypesMap[Account.primaryOwner.owner.gender] || genderTypesMap["No Answer"]);

let residencyStatusMap = {
    "US Citizen": "RESIDENT",
    "US Resident Alien": "RESIDENT_ALIEN",
    "Non-Resident Alien": "NON_RESIDENT_ALIEN"
};
set(Account, "primaryOwner.owner.citizenshipStatus", Account.primaryOwner.owner.citizenshipStatus ? residencyStatusMap[Account.primaryOwner.owner.citizenshipStatus] : residencyStatusMap["US Citizen"]);
set(Account, "primaryOwner.owner.countryOfCitizenship", residencyStatusMap[Account.primaryOwner.owner.citizenshipStatus]);

let maritalStatusMap = {
    "Single": "SINGLE",
    "Married": "MARRIED",
    "Widowed": "WIDOWED",
    "Divorced": "DIVORCED"
};
set(Account, "primaryOwner.owner.maritalStatus", maritalStatusMap[Account.primaryOwner.owner.maritalStatus]);
// Account.primaryOwner.owner.maritalStatus = maritalStatusMap[Account.primaryOwner.owner.maritalStatus];

let proofOfIdentityMap = {
    "Driver's License": "DRIVERS_LICENSE",
    "Passport": "PASSPORT",
    "State ID": "STATE_ID",
    "Foreign Tax ID": "FOREIGN_TAX_ID",
    "Other Government ID": "OTHER_GOVERNMENT_ID"
};
if (Account.primaryOwner.owner.proofOfIdentity != null){
   set(Account, "primaryOwner.owner.proofOfIdentity.type", proofOfIdentityMap[Account.primaryOwner.owner.proofOfIdentity.type]);
}

let employmentStatusMap = {
    "Employed": "EMPLOYED",
    "Self-Employed": "SELF_EMPLOYED",
    "Retired": "RETIRED",
    "Not Employed": "UNEMPLOYED",
    "Homemaker": "HOME_MAKER",
    "Student": "STUDENT"
};
set(Account, "primaryOwner.owner.employmentStatus", employmentStatusMap[Account.primaryOwner.owner.employmentStatus]);

let ownershipStatusMap = {
    "Own": "OWN",
    "Rent": "RENT"
};
set(Account, "primaryOwner.owner.homeOwnership", ownershipStatusMap[Account.primaryOwner.owner.homeOwnership]);

// This has to confirm
let yesNoMap = {
    "Yes": "YES",
    "No": "NO"
};
if (Account.primaryOwner.owner.regulatoryDisclosuresV0 != null){
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity", yesNoMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity] || yesNoMap["No"]);
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany",  yesNoMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany] || yesNoMap["No"]);
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial",  yesNoMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial] || yesNoMap["No"]);
}

let brokerRegulatoryMap = {
    "Broker-Dealer or Municipal Securities Dealer": "DEALER",
    "Investment Advisor": "ADVISOR",
    "FINRA or other Self-Regulatory Organization": "SRO",
    "State or Federal Securities Regulator": "REGULATOR"
};
if (Account.primaryOwner.owner.regulatoryDisclosuresV0 != null){
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer", brokerRegulatoryMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer]);
}

let corporateRolesMap = {
    "10% shareholder": "SHAREHOLDER",
    "CEO": "CEO",
    "CFO": "CFO",
    "COO": "COO",
    "Other Officer": "OTHER"
};
if (Account.primaryOwner.owner.regulatoryDisclosuresV0 != null){
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.officerRole", corporateRolesMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.officerRole]);
}

let financialSourcesMap = {
    "Investments": "INVESTMENT",
    "Compensation": "COMPENSATION",
    "Retirement Assets": "RETIREMENT_ASSETS",
    "Other": "OTHER",
    "Gift": "GIFT",
    "Donation": "DONATIONS",
    "Insurance Payments": "INSURANCE",
    "Inheritance": "INHERITANCE",
    "Social Security Benefits": "SOCIAL_SECURITY_BENEFITS",
    "Legal Settlement": "LEGAL_SETTLEMENT",
    "Spouse/Parent": "SPOUSE_PARENT",
    "Lottery/Gaming": "LOTTERY_GAMING",
    "Business Revenue": "INCOME",
    "Sale of Business or Property": "BUSINESS_SALE"
};
set(Account, "initialFundingSource", financialSourcesMap[Account.initialFundingSource]);

let insuranceSweepMap = {
    "Yes": "INSURED_DEPOSIT",
    "No": "DO_NOT_SWEEP"
};
set(Account, "moneyFundSweepOptIn", insuranceSweepMap[Account.moneyFundSweepOptIn]);

let depositMailingMap = {
    "Deposit into Free Credit Balance": "DEPOSIT",
    "Mail weekly": "MAILED_WEEKLY",
    "Mail semi-monthly": "MAILED_SEMI_MONTHLY",
    "Mail monthly": "MAILED_MONTHLY"
};
set(Account, "cashDividentOption", depositMailingMap[Account.cashDividentOption]);

let dividendReinvestmentMap = {
    "Cash dividends - opt in for Reinvest": "CASH",
    "No Reinvestment": "NO_REINVEST",
    "Reinvestment all - opt out for Cash Dividends": "REINVEST_ALL"
};
set(Account, "dividendReinvestmentOption", dividendReinvestmentMap[Account.dividendReinvestmentOption]);

let cashDividendOptionMap = {
	"Deposit into Free Credit Balance": "DEPOSIT",
	"Mail weekly": "MAILED_WEEKLY",
	"Mail semi-monthly": "MAILED_SEMI_MONTHLY",
	"Mail monthly": "MAILED_MONTHLY"
};

set(Account, "cashDividendOption", cashDividendOptionMap[Account.cashDividendOption]);

let incomeCategory = 
  (Account.annualIncome == "" || !Account.annualIncome) ? 'REFUSE_TO_DISCLOSE' :
  Account.annualIncome < 25000 ? 'UNDER_25K' :
  Account.annualIncome <= 50000 ? 'FROM_25K_TO_50K' :
  Account.annualIncome <= 100000 ? 'FROM_50K_TO_100K' :
  Account.annualIncome <= 200000 ? 'FROM_100K_TO_200K' :
  Account.annualIncome <= 500000 ? 'FROM_200K_TO_500K' :
  Account.annualIncome <= 1000000 ? 'FROM_500K_TO_1M' : 'OVER_1M';
set(Account, "annualIncome", incomeCategory);
let netWorthCategory = 
  (!Account.netWorthExcludingHome || Account.netWorthExcludingHome < 50000) ? 'UNDER_50K' :
  Account.netWorthExcludingHome <= 100000 ? 'FROM_50K_TO_100K' :
  Account.netWorthExcludingHome <= 500000 ? 'FROM_100K_TO_500' :
  Account.netWorthExcludingHome <= 1000000 ? 'FROM_500K_TO_1M' :
  Account.netWorthExcludingHome <= 3000000 ? 'FROM_1M_TO_3M' : 'OVER_3M';
set(Account, "netWorthExcludingHome", netWorthCategory);

let liquidAssetsCategory = 
  (!Account.liquidAssets || Account.liquidAssets < 25000) ? 'UNDER_25K' :
  Account.liquidAssets <= 50000 ? 'FROM_25K_TO_50K' :
  Account.liquidAssets <= 100000 ? 'FROM_50K_TO_100K' :
  Account.liquidAssets <= 200000 ? 'FROM_100K_TO_200K' :
  Account.liquidAssets <= 500000 ? 'FROM_200K_TO_500K' :
  Account.liquidAssets <= 1000000 ? 'FROM_500K_TO_1M' :
  Account.liquidAssets <= 3000000 ? 'FROM_1M_TO_3M' : 'OVER_3M';
set(Account, "liquidAssets", liquidAssetsCategory);

let investmentRiskMap = {
    "Low": "LOW",
    "Moderate": "MODERATE",
    "Aggressive": "AGGRESSIVE",
    "Speculative": "SPECULATIVE"
};
set(Account, "riskTolerance", investmentRiskMap[Account.riskTolerance]);

let investmentCategory = 
  Account.estimatedValueOfInvestments < 10000 ? 'UNDER_10K' :
  Account.estimatedValueOfInvestments <= 24000 ? 'UP_TO_24K' :
  Account.estimatedValueOfInvestments <= 50000 ? 'UP_TO_50K' :
  Account.estimatedValueOfInvestments <= 200000 ? 'UP_TO_200K' :
  Account.estimatedValueOfInvestments <= 500000 ? 'UP_TO_500K' : 
  'OVER_500K';
set(Account, "estimatedValueOfInvestments", investmentCategory);

let investmentObjectiveMap = {
    "Current Income": "INCOME",
    "Balanced": "BALANCED",
    "Growth & Income": "GROWTH_INCOME",
    "Growth": "GROWTH",
    "Maximum Growth": "MAX_GROWTH",
    "Speculation": "SPECULATION"
};
set(Account, "investmentObjective", investmentObjectiveMap[Account.investmentObjective]);

let ratingLevelMap = {
    "Limited": "LIMITED",
    "Good": "GOOD",
    "Excellent": "EXCELLENT"
};
set(Account, "investmentExperience", ratingLevelMap[Account.investmentExperience]);

set(Account, "primaryOwner.owner.investmentExperienceEquities", 
  !Account.primaryOwner.owner.investmentExperienceEquities || Account.primaryOwner.owner.investmentExperienceEquities == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investmentExperienceEquities <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investmentExperienceMutualFunds", 
  !Account.primaryOwner.owner.investmentExperienceMutualFunds || Account.primaryOwner.owner.investmentExperienceMutualFunds == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investmentExperienceMutualFunds <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investmentExperienceFixedIncome", 
  !Account.primaryOwner.owner.investmentExperienceFixedIncome || Account.primaryOwner.owner.investmentExperienceFixedIncome == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investmentExperienceFixedIncome <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investmentExperienceOptions", 
  !Account.primaryOwner.owner.investmentExperienceOptions || Account.primaryOwner.owner.investmentExperienceOptions == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investmentExperienceOptions <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investExperienceFutures", 
  !Account.primaryOwner.owner.investExperienceFutures || Account.primaryOwner.owner.investExperienceFutures == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investExperienceFutures <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investmentExperienceAnnuities", 
  !Account.primaryOwner.owner.investmentExperienceAnnuities || Account.primaryOwner.owner.investmentExperienceAnnuities == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investmentExperienceAnnuities <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investExperienceAlternatives", 
  !Account.primaryOwner.owner.investExperienceAlternatives || Account.primaryOwner.owner.investExperienceAlternatives == "" ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investExperienceAlternatives <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "primaryOwner.owner.investExperienceMargin", 
  (!Account.primaryOwner.owner.investExperienceMargin || Account.primaryOwner.owner.investExperienceMargin == "") ? 'NO_EXPERIENCE' :
  Account.primaryOwner.owner.investExperienceMargin <= 5 ? 'FROM_1_TO_5_YEARS' : 'OVER_5_YEARS');

set(Account, "liquidityNeeds", (!Account.liquidityNeeds || Account.liquidityNeeds == "") ? 'UNDER_1_YEAR' :
  (Account.liquidityNeeds >= 1 && Account.liquidityNeeds < 5 ? 'FROM_1_TO_5_YEARS' :  
	  (Account.liquidityNeeds >= 5 && Account.liquidityNeeds < 10 ? 'FROM_5_TO_10_YEARS' :  
		(Account.liquidityNeeds >= 10 && Account.liquidityNeeds < 15 ? 'FROM_10_TO_15_YEARS' : 'OVER_15_YEARS')
	  )
  ));  
 
set(Account, "specialExpensesTimeframe", (!Account.specialExpensesTimeframe || Account.specialExpensesTimeframe == "" || Account.specialExpensesTimeframe < 3) ? 'UNDER_2_YEARS' :
  (Account.specialExpensesTimeframe >= 3 && Account.specialExpensesTimeframe <= 5 ? 'FROM_3_TO_5_YEARS' :  
	  (Account.specialExpensesTimeframe > 5 && Account.specialExpensesTimeframe <= 10 ? 'FROM_6_TO_10_YEARS' : null)
  ));

let horizonMap = {
    'Not specified': 'NOT_APPLICABLE',
	'Less than 1 year': 'UNDER_1_YEAR',
	'1 - 5 years': 'FROM_1_TO_5_YEARS',
	'5 - 10 years': 'FROM_5_TO_10_YEARS',
	'10 - 15 years': 'FROM_10_TO_15_YEARS',
	'Over 15 years': 'OVER_15_YEARS'
};
if (Account.timeHorizon){
	set(Account, 'timeHorizon', horizonMap[Account.timeHorizon]);
} else {
	set(Account, 'timeHorizon', 'NOT_APPLICABLE');
}

if (Account.federalMarginalTaxRate){
	set(Account, "federalMarginalTaxRate", replace(Account.federalMarginalTaxRate, "%", ""));
}

if(Account.primaryOwner && Account.primaryOwner.owner){
	set(Account.primaryOwner.owner, "investmentExperienceEquitiesTransactions", 0);
	set(Account.primaryOwner.owner, "investmentExperienceMutualFundsTransactions",  0);
	set(Account.primaryOwner.owner, "investmentExperienceFixedIncomeTransactions", 0);
	set(Account.primaryOwner.owner, "investmentExperienceOptionsTransactions", 0);
	set(Account.primaryOwner.owner, "investExperienceFuturesTransactions", 0);
	set(Account.primaryOwner.owner, "investmentExperienceAnnuitiesTransactions", 0);
	set(Account.primaryOwner.owner, "investExperienceAlternativesTransactions", 0);
	set(Account.primaryOwner.owner, "investExperienceMarginTransactions", 0);
}

return Account;