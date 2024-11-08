let i = 0;

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
	"deposit into free credit balance": "DEPOSIT",
	"mail weekly": "MAILED_WEEKLY",
	"mail semi-monthly": "MAILED_SEMI_MONTHLY",
	"mail monthly": "MAILED_MONTHLY",
	"dividends deposit into free credit balance": "DEPOSIT",
	"dividends mailed weekly": "MAILED_WEEKLY",
	"dividends mailed semi-monthly": "MAILED_SEMI_MONTHLY",
	"dividends mailed monthly": "MAILED_MONTHLY"
};

set(Account, "cashDividendOption", cashDividendOptionMap[toLower(Account.cashDividendOption)]);

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

return Account;