let genderTypeMap = {
  "MALE": "Male",
  "FEMALE": "Female",
  "NO_ANSWER": "No Answer"
};
let accountTypesMap = {
  "JOINT_COMMUNITY_PROPERTY": "COMM-PROP",
  "JOINT_COMMUNITY_PROPERTY_WITH_ROS": "COMM-PROP-RIGHTS-SURV",
  "JOINT_TENANTS_BY_ENTIRETY": "TENANTS-ENTIRETY",
  "JOINT_TENANTS_IN_COMMON": "TENANTS-COMM",
  "TRUST_IRREVOCABLE": "IRR-TRUST",
  "JOINT_TENANTS_WITH_ROS": "JOINT-TENANTS-RIGHT-SURV",
  "INDIVIDUAL": "INDIVIDUAL-TOD", // "INDIVIDUAL-TOD" chosen as the key as both have the same value
  "IRA_TRADITIONAL": "IRA-TRADITIONAL",
  "IRA_ROTH": "IRA-ROTH",
  "IRA_SIMPLE": "IRA-SIMPLE",
  "TRUST_REVOCABLE": "REVOCABLE-TRUST",
  "IRA_SEP": "IRA-SEP",
  "IRA_ROLLOVER": "IRA-ROLL-OVER"
};
let residencyStatusMap = {
  "RESIDENT": "US Citizen",
  "RESIDENT_ALIEN": "Resident Alien",
  "NON_RESIDENT_ALIEN": "Non-Resident Alien"
};
let maritalStatusMap = {
  "SINGLE": "Single",
  "MARRIED": "Married",
  "WIDOWED": "Widowed",
  "DIVORCED": "Divorced"
};
let employmentStatusMap = {
  "EMPLOYED": "Employed",
  "SELF_EMPLOYED": "Self Employed",
  "RETIRED": "Retired",
  "UNEMPLOYED": "Unemployed",
  "HOME_MAKER": "Homemaker",
  "STUDENT": "Student"
};

let ownershipStatusMap = {
  "OWN": "Own",
  "RENT": "Rent"
};
let brokerRegulatoryMap = {
  "DEALER": "Broker-Dealer or Municipal Securities Dealer",
  "ADVISOR": "Investment Advisor",
  "SRO": "FINRA or other Self-Regulatory Organization",
  "REGULATOR": "State or Federal Securities Regulator"
};
let corporateRolesMap = {
  "SHAREHOLDER": "10% shareholder",
  "CEO": "CEO",
  "CFO": "CFO",
  "COO": "COO",
  "OTHER": "Other Officer"
};
let financialSourcesMap = {
  "INVESTMENT": "Investments",
  "COMPENSATION": "Compensation",
  "RETIREMENT_ASSETS": "Retirement Assets",
  "OTHER": "Other",
  "GIFT": "Gift",
  "DONATIONS": "Donation",
  "INSURANCE": "Insurance Payments",
  "INHERITANCE": "Inheritance",
  "SOCIAL_SECURITY_BENEFITS": "Social Security Benefits",
  "LEGAL_SETTLEMENT": "Legal Settlement",
  "SPOUSE_PARENT": "Spouse/Parent",
  "LOTTERY_GAMING": "Lottery/Gaming",
  "INCOME": "Business Revenue",
  "BUSINESS_SALE": "Sale of Business or Property"
};
let insuranceSweepMap = {
  "INSURED_DEPOSIT": "Yes",
  "INSURED_DEPOSIT": true,
  "DO_NOT_SWEEP": "No",
  "DO_NOT_SWEEP": false
};
let cashDividendOptionMap = {
  "DEPOSIT": "dividends deposit into free credit balance",
  "MAILED_WEEKLY": "dividends mailed weekly",
  "MAILED_SEMI_MONTHLY": "dividends mailed semi-monthly",
  "MAILED_MONTHLY": "dividends mailed monthly",
  "DEPOSIT": "deposit into free credit balance",
  "MAILED_WEEKLY": "mail weekly",
  "MAILED_SEMI_MONTHLY": "mail semi-monthly",
  "MAILED_MONTHLY": "mail monthly"
};

let dividendReinvestmentMap = {
  "CASH": "cash dividends - opt in for reinvestment",
  "NO_REINVEST": "no reinvestment",
  "REINVEST_ALL": "reinvestment all - opt out for cash dividends"
};
let incomeCategoryMap = {
  "REFUSE_TO_DISCLOSE": "Income not provided or refused to disclose",
  "UNDER_10K": "Under 10k",
  "UP_TO_24K": "Up to 24k",
  "UP_TO_50K": "Up to 50k",
  "BETWEEN_25K_AND_50K": "Between 25k and 50k",
  "BETWEEN_50K_AND_100K": "Between 50k and 100k",
  "BETWEEN_100K_AND_200K": "Between 100k and 200k",
  "BETWEEN_200K_AND_500K": "Between 200k and 500k",
  "BETWEEN_500K_AND_1M": "Between 500k and 1M",
  "FROM_25K_TO_50K": "Between 25k and 50k",
  "FROM_50K_TO_100K": "Between 50k and 100k",
  "FROM_100K_TO_200K": "Between 100k and 200k",
  "FROM_200K_TO_500K": "Between 200k and 500k",
  "FROM_500K_TO_1M": "Between 500k and 1M",
  "FROM_1M_TO_3M": "From 1M to 3M",
  "OVER_3M": "Over 3M",
  "OVER_1M": "Over 1M",
  "OVER_500K": "Over 500k",
  "GREATER_THAN_1M": "Greater than 1M"
};
let investmentRiskMap = {
  "LOW": "Low",
  "MODERATE": "Moderate",
  "AGGRESSIVE": "Aggressive",
  "SPECULATIVE": "Speculative"
};
let investmentObjectiveMap = {
  "INCOME": "Current Income",
  "BALANCED": "Balanced",
  "GROWTH_INCOME": "Growth & Income",
  "GROWTH": "Growth",
  "MAX_GROWTH": "Maximum Growth",
  "SPECULATION": "Speculation"
};
let ratingLevelMap = {
  "LIMITED": "Limited",
  "GOOD": "Good",
  "EXCELLENT": "Excellent"
};
let experienceMap = {
  "NO_EXPERIENCE": "No experience",
  "UNDER_1_YEAR": "less than 1 year",
  "FROM_1_TO_5_YEARS": "1 to 5 years",
  "FROM_3_TO_5_YEARS": "3 to 5 years",
  "FROM_5_TO_10_YEARS": "5 to 10 years",
  "FROM_10_TO_15_YEARS": "10 to 15 years",
  "OVER_15_YEARS": "Over 15 years",
  "OVER_5_YEARS": "Over 5 years",
  "NOT_APPLICABLE": "not specified"
};
let assetExperienceRangeMap = {
  "NO_EXPERIENCE": "0",
  "UNDER_1_YEAR": "0",
  "FROM_1_TO_5_YEARS": "1",
  "FROM_3_TO_5_YEARS": "3",
  "FROM_5_TO_10_YEARS": "5",
  "FROM_10_TO_15_YEARS": "10",
  "OVER_15_YEARS": "16",
  "OVER_5_YEARS": "6",
  "NOT_APPLICABLE": "0"
};
let reversedRelationshipMap = {
  "EXPECTANCY_TABLE_DISTRIBUTIONS_BEGIN": "Expectancy Table Distribution Begins",
  "EXPECTANCY_TABLE_FIVE_YEARS_DEPLETION": "Expectancy Table Distribution 5 year depletion",
  "EXPECTANCY_TABLE_TEN_YEARS_DEPLETION": "Expectancy Table Distribution 10 year depletion",
  "JOINT_ELAPSED_RMD": "Joint Elapsed RMD",
  "OTHER": "Other",
  "SINGLE_RECALC_RMD": "Single Recal RMD",
  "SPOUSE": "Spouse",
  "JOINT_RECALCULATION": "Joint Recalculation"
};
let yesNoMap = {
  "YES": true,
  "NO": false
};

let optionsRiskLevelMap = {
  1: 'Covered calls',
  2: 'Purchase calls & puts',
  3: 'Spreads/long straddles',
  4: 'Equity puts writing',
  5: 'Uncovered call writing',
  6: 'Uncovered index options'
};

return {
  "genderTypeMap": genderTypeMap,
  "accountTypesMap": accountTypesMap,
  "residencyStatusMap": residencyStatusMap,
  "maritalStatusMap": maritalStatusMap,
  "employmentStatusMap": employmentStatusMap,
  "ownershipStatusMap": ownershipStatusMap,
  "brokerRegulatoryMap": brokerRegulatoryMap,
  "corporateRolesMap": corporateRolesMap,
  "financialSourcesMap": financialSourcesMap,
  "insuranceSweepMap": insuranceSweepMap,
  "cashDividendOptionMap": cashDividendOptionMap,
  "dividendReinvestmentMap": dividendReinvestmentMap,
  "incomeCategoryMap": incomeCategoryMap,
  "investmentRiskMap": investmentRiskMap,
  "investmentObjectiveMap": investmentObjectiveMap,
  "ratingLevelMap": ratingLevelMap,
  "experienceMap": experienceMap,
  "reversedRelationshipMap": reversedRelationshipMap,
  "yesNoMap": yesNoMap,
  "optionsRiskLevelMap": optionsRiskLevelMap
};