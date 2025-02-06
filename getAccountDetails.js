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

let apiResponse = response.entity[0];

accDetails = {
  "name": apiResponse.accountName || "",
  "repCodeLink": {
    "repCode": apiResponse.repCode || ""
  },
  "registrationType": {
    "name": accountTypesMap[apiResponse.accountType] || ""
  },
  "nickName": apiResponse.principalName || "",
  "accountNumber": apiResponse.accountNumber || "",
  "accountCustodianStatus": apiResponse.status || "",
  "startDate": apiResponse.openedDate || "",
  "tradingPrivileges": apiResponse.enableMargin && apiResponse.enableMargin == 'YES'
    ? 'Margin'
    : (apiResponse.enableOptions && apiResponse.enableOptions == 'YES' ? 'Options' : null),
  "initialFundingSource": apiResponse.fundingFeatures ? financialSourcesMap[apiResponse.fundingFeatures.fundingSource] : "",
  "otherInitialFundingSource": apiResponse.fundingFeatures ? apiResponse.fundingFeatures.fundingSpecifics : "",
  "moneyFundSweepOptIn": apiResponse.fundingFeatures ? insuranceSweepMap[apiResponse.fundingFeatures.moneyFundInstructions] : "",
  "cashDividendOption": apiResponse.fundingFeatures ? cashDividendOptionMap[apiResponse.fundingFeatures.dividendCashOptions] : "",
  "dividendReinvestmentOption": apiResponse.fundingFeatures ? dividendReinvestmentMap[apiResponse.fundingFeatures.dividendDripOptions] : "",
  "annualIncome": apiResponse.investmentProfile ? incomeCategoryMap[apiResponse.investmentProfile.annualIncomeRange] : "",
  "netWorthExcludingHome": apiResponse.investmentProfile ? incomeCategoryMap[apiResponse.investmentProfile.netWorthRange] : "",
  "liquidAssets": apiResponse.investmentProfile ? incomeCategoryMap[apiResponse.investmentProfile.liquidNetWorthRange] : "",
  "federalMarginalTaxRate": apiResponse.investmentProfile ? apiResponse.investmentProfile.taxBracket : "",
  "riskTolerance": apiResponse.investmentProfile ? investmentRiskMap[apiResponse.investmentProfile.riskTolerance] : "",
  "estimatedValueOfInvestments": apiResponse.investmentProfile ? incomeCategoryMap[apiResponse.investmentProfile.investmentValueRange] : "",
  "investmentObjective": apiResponse.investmentProfile ? investmentObjectiveMap[apiResponse.investmentProfile.investmentObjective] : "",
  "investmentExperience": apiResponse.investmentProfile ? ratingLevelMap[apiResponse.investmentProfile.investmentKnowledge] : "",
  "liquidityNeeds": apiResponse.investmentProfile ? experienceMap[apiResponse.investmentProfile.liquidityNeeds] : "",
  "annualExpenses": apiResponse.investmentProfile ? apiResponse.investmentProfile.annualExpenses : 0,
  "specialExpenses": apiResponse.investmentProfile ? apiResponse.investmentProfile.specialExpenses : 0,
  "specialExpensesTimeframe": apiResponse.investmentProfile ? experienceMap[apiResponse.investmentProfile.specialExpenseTimeFrame] : "",
  "timeHorizon": apiResponse.investmentProfile ? experienceMap[apiResponse.investmentProfile.timeHorizon] : "",
  "optionsRiskLevel": apiResponse.optionsLevel ? apiResponse.optionsLevel : "",
  "discretion": apiResponse.discretion ? (apiResponse.discretion == 'FULL' ? 'Full' : 'Limited') : ""
};
if (isPresent(apiResponse.individualHolder)) {
  let ssNOrTaxID = null;
  if (isPresent(apiResponse.individualHolder.ssn)) {
    ssNOrTaxID = replace(apiResponse.individualHolder.ssn, '-', '');
  }
  let owner = {
    "firstName": apiResponse.individualHolder.name && apiResponse.individualHolder.name.givenName
      ? apiResponse.individualHolder.name.givenName
      : "",
    "middleName": apiResponse.individualHolder.name && apiResponse.individualHolder.name.middleInitial
      ? apiResponse.individualHolder.name.middleInitial
      : "",
    "lastName": apiResponse.individualHolder.name && apiResponse.individualHolder.name.familyName
      ? apiResponse.individualHolder.name.familyName
      : "",
    "birthDate": apiResponse.individualHolder.birthDate ? apiResponse.individualHolder.birthDate : "",
    "gender": apiResponse.individualHolder.gender ? genderTypeMap[apiResponse.individualHolder.gender] : "",
    "citizenshipStatus": apiResponse.individualHolder.citizenship && apiResponse.individualHolder.citizenship.citizenshipStatus
      ? residencyStatusMap[apiResponse.individualHolder.citizenship.citizenshipStatus]
      : "",
    "ssNOrTaxID": ssNOrTaxID ?
      substring(ssNOrTaxID, 0, 3) + '-' + substring(ssNOrTaxID, 3, 5) + '-' + substring(ssNOrTaxID, 5, 9) :
      "",
    "numberOfDependents": apiResponse.individualHolder.numDependents
      ? apiResponse.individualHolder.numDependents
      : 0,
    "maritalStatus": apiResponse.individualHolder.maritalStatus ? maritalStatusMap[apiResponse.individualHolder.maritalStatus] : "",
    "employmentStatus": apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.employmentStatus
      ? employmentStatusMap[apiResponse.individualHolder.employment.employmentStatus]
      : "",
    "occupation": apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.occupation
      ? apiResponse.individualHolder.employment.occupation
      : "",
    "natureOfBusiness": apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.natureOfBusiness
      ? apiResponse.individualHolder.employment.natureOfBusiness
      : "",
    "employer": apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.employer
      ? apiResponse.individualHolder.employment.employer
      : "",
    "yearsEmployed": apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.yearsEmployed
      ? apiResponse.individualHolder.employment.yearsEmployed
      : 0,
    "employerPhoneNumber": apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.workPhone
      ? apiResponse.individualHolder.employment.workPhone
      : "",
    "homeOwnership": apiResponse.individualHolder.homeType ? ownershipStatusMap[apiResponse.individualHolder.homeType] : "",
    "primaryEmail": apiResponse.individualHolder.email ? apiResponse.individualHolder.email : "",
    "primaryPhoneNumber": apiResponse.individualHolder.contact && apiResponse.individualHolder.contact.phone
      ? apiResponse.individualHolder.contact.phone
      : "",
    // stock
    "investmentExperienceEquities": apiResponse.investmentProfile && apiResponse.investmentProfile.stocksExperience
      ? experienceMap[apiResponse.investmentProfile.stocksExperience.assetExperienceRange] : null,
    "investmentExperienceEquitiesTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.stocksExperience
      ? apiResponse.investmentProfile.stocksExperience.transactionsPerYear : null,
    // Mutual funds experience
    "investmentExperienceMutualFunds": apiResponse.investmentProfile && apiResponse.investmentProfile.mutualFundsExperience
      ? experienceMap[apiResponse.investmentProfile.mutualFundsExperience.assetExperienceRange] : null,
    "investmentExperienceMutualFundsTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.mutualFundsExperience
      ? apiResponse.investmentProfile.mutualFundsExperience.transactionsPerYear : null,
    // Bonds experience
    "investmentExperienceFixedIncome": apiResponse.investmentProfile && apiResponse.investmentProfile.bondsExperience
      ? experienceMap[apiResponse.investmentProfile.bondsExperience.assetExperienceRange] : null,
    "investmentExperienceFixedIncomeTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.bondsExperience
      ? apiResponse.investmentProfile.bondsExperience.transactionsPerYear : null,
    // Options experience
    "investmentExperienceOptions": apiResponse.investmentProfile && apiResponse.investmentProfile.optionsExperience
      ? experienceMap[apiResponse.investmentProfile.optionsExperience.assetExperienceRange] : null,
    "investmentExperienceOptionsTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.optionsExperience
      ? apiResponse.investmentProfile.optionsExperience.transactionsPerYear : null,
    // Futures experience
    "investExperienceFutures": apiResponse.investmentProfile && apiResponse.investmentProfile.futuresExperience
      ? experienceMap[apiResponse.investmentProfile.futuresExperience.assetExperienceRange] : null,
    "investExperienceFuturesTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.futuresExperience
      ? apiResponse.investmentProfile.futuresExperience.transactionsPerYear : null,
    // Annuities experience
    "investmentExperienceAnnuities": apiResponse.investmentProfile && apiResponse.investmentProfile.annuitiesExperience
      ? experienceMap[apiResponse.investmentProfile.annuitiesExperience.assetExperienceRange] : null,
    "investmentExperienceAnnuitiesTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.annuitiesExperience
      ? apiResponse.investmentProfile.annuitiesExperience.transactionsPerYear : null,
    // Alternative investments experience
    "investExperienceAlternatives": apiResponse.investmentProfile && apiResponse.investmentProfile.alternativeInvestmentsExperience
      ? experienceMap[apiResponse.investmentProfile.alternativeInvestmentsExperience.assetExperienceRange] : null,
    "investExperienceAlternativesTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.alternativeInvestmentsExperience
      ? apiResponse.investmentProfile.alternativeInvestmentsExperience.transactionsPerYear : null,
    // Margins experience
    "investExperienceMargin": apiResponse.investmentProfile && apiResponse.investmentProfile.marginsExperience
      ? experienceMap[apiResponse.investmentProfile.marginsExperience.assetExperienceRange] : null,
    "investExperienceMarginTransactions": apiResponse.investmentProfile && apiResponse.investmentProfile.marginsExperience
      ? apiResponse.investmentProfile.marginsExperience.transactionsPerYear : null,
    "backupWithholdingExemptPayeeCode": apiResponse.w9 && apiResponse.w9.exemptPayee ? apiResponse.w9.exemptPayee : null,
    "fatcaReportingExemptionCode": apiResponse.w9 && apiResponse.w9.factaCode ? apiResponse.w9.factaCode : null
  };
  if (apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.workAddress) {
    let workAddress = apiResponse.individualHolder.employment.workAddress;
    let employerAddress = {
      "line1": workAddress.streetLine1,
      "line2": workAddress.streetLine2,
      "city": workAddress.city,
      "postalCode": workAddress.postalCode,
      "state": find(stateBO, state, state.code == workAddress.stateOrProvince),
      "country": find(countryBO, country, country.code2Letters == countryMap[workAddress.country])
    };
    set(owner, "employerAddress", employerAddress);
  }
  if (apiResponse.individualHolder.contact) {
    if (apiResponse.individualHolder.contact.affiliationsGroup) {
      let affiliationsGroup = apiResponse.individualHolder.contact.affiliationsGroup;
      let regulatoryDisclosuresV0 = {
        "employedBySecurityIndustryEntity": affiliationsGroup.nasdGroup ? yesNoMap[affiliationsGroup.nasdGroup.nasd] : null,
        "typeOfEmployer": affiliationsGroup.nasdGroup ? brokerRegulatoryMap[affiliationsGroup.nasdGroup.nasdType] : null,
        "firmNameForEmployee": affiliationsGroup.nasdGroup ? affiliationsGroup.nasdGroup.nasdEntity : null,
        "directorOrOfficerInPublicCompany": affiliationsGroup.companyGroup ? yesNoMap[affiliationsGroup.companyGroup.publicCompany] : null,
        "officerRole": affiliationsGroup.companyGroup ? corporateRolesMap[affiliationsGroup.companyGroup.publicCompanyType] : null,
        "firmNameForOfficer": affiliationsGroup.companyGroup ? affiliationsGroup.companyGroup.publicCompanyNameOrSymbol : null,
        "seniorMilitaryGovermentOrPoliticalOfficial": affiliationsGroup.foreignGroup ? yesNoMap[affiliationsGroup.foreignGroup.foreignOfficial] : null,
        "foreignOfficialCountry": affiliationsGroup.foreignGroup ?
          find(countryBO, country, country.code2Letters == countryMap[affiliationsGroup.foreignGroup.foreignOfficialCountry]) :
          null
      };
      set(owner, "regulatoryDisclosuresV0", regulatoryDisclosuresV0);
    }
    if (apiResponse.individualHolder.contact.legalAddress) {
      let legalAddress = {
        "line1": apiResponse.individualHolder.contact.legalAddress.streetLine1,
        "line2": apiResponse.individualHolder.contact.legalAddress.streetLine2,
        "city": apiResponse.individualHolder.contact.legalAddress.city,
        "postalCode": apiResponse.individualHolder.contact.legalAddress.postalCode,
        "state": find(stateBO, state, state.code == apiResponse.individualHolder.contact.legalAddress.stateOrProvince),
        "country": find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.legalAddress.country])
      };
      set(owner, "legalAddress", legalAddress);
    }
    if (apiResponse.individualHolder.contact.mailingAddress) {
      let mailingAddress = {
        "line1": apiResponse.individualHolder.contact.mailingAddress.streetLine1,
        "line2": apiResponse.individualHolder.contact.mailingAddress.streetLine2,
        "city": apiResponse.individualHolder.contact.mailingAddress.city,
        "postalCode": apiResponse.individualHolder.contact.mailingAddress.postalCode,
        "state": find(stateBO, state, state.code == apiResponse.individualHolder.contact.mailingAddress.stateOrProvince),
        "country": find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.mailingAddress.country])
      };
      set(owner, "mailingAddress", mailingAddress);
    }
    if (apiResponse.individualHolder.contact.previousAddress) {
      let previousAddress = {
        "line1": apiResponse.individualHolder.contact.previousAddress.streetLine1,
        "line2": apiResponse.individualHolder.contact.previousAddress.streetLine2,
        "city": apiResponse.individualHolder.contact.previousAddress.city,
        "postalCode": apiResponse.individualHolder.contact.previousAddress.postalCode,
        "state": find(stateBO, state, state.code == apiResponse.individualHolder.contact.previousAddress.stateOrProvince),
        "country": find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.previousAddress.country])
      };
      set(owner, "previousLegalAddress", previousAddress);
    }
  }
  if (apiResponse.individualHolder.patriotAct) {
    let proofOfIdentity = {
      "type": apiResponse.individualHolder.patriotAct.idType,
      "idNumber": apiResponse.individualHolder.patriotAct.idNumber,
      "issueDate": apiResponse.individualHolder.patriotAct.issueDate,
      "expiryDate": apiResponse.individualHolder.patriotAct.expirationDate
    };
    set(owner, "proofOfIdentity", proofOfIdentity);
  }
  if (apiResponse.individualHolder.citizenship && apiResponse.individualHolder.citizenship.countryOfResidence) {
    let countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.citizenship.countryOfResidence]);
    set(owner, "countryOfResidence", countryOfResidence);
  }
  set(accDetails, "primaryOwner.owner", owner);
}
if (apiResponse.trustedContact) {
  let trustedContact = {
    "fullName": apiResponse.trustedContact.name,
    "primaryEmail": apiResponse.trustedContact.email,
    "primaryPhoneNumber": apiResponse.trustedContact.phone,
    "mailingAddress": {
      "line1": apiResponse.trustedContact.address.streetLine1,
      "line2": apiResponse.trustedContact.address.streetLine2,
      "city": apiResponse.trustedContact.address.city,
      "postalCode": apiResponse.trustedContact.address.postalCode,
      "state": find(stateBO, state, state.code == apiResponse.trustedContact.address.stateOrProvince),
      "country": find(countryBO, country, country.code2Letters == countryMap[apiResponse.trustedContact.address.country])
    }
  };
  set(accDetails, "primaryOwner.trustedContactRelationship", apiResponse.trustedContact.relationship);
  set(accDetails, "primaryOwner.trustedContact", trustedContact);
}
if (apiResponse.jointAccount && apiResponse.jointAccount.jointTenantMarried) {
  set(accDetails, "primaryOwner.spouseIsAJointOwner", apiResponse.jointAccount.jointTenantMarried == 'YES' ? true : false);
}
if (apiResponse.coHolders && isArray(apiResponse.coHolders)) {
  let secondaryOwners = [];
  for (let secondaryOwner of apiResponse.coHolders) {
    let ssNOrTaxID2 = null;
    if (isPresent(secondaryOwner.ssn)) {
      ssNOrTaxID2 = replace(secondaryOwner.ssn, '-', '');
    }
    let owner2 = {
      "firstName": secondaryOwner.name && secondaryOwner.name.givenName
        ? secondaryOwner.name.givenName
        : "",
      "middleName": secondaryOwner.name && secondaryOwner.name.middleInitial
        ? secondaryOwner.name.middleInitial
        : "",
      "lastName": secondaryOwner.name && secondaryOwner.name.familyName
        ? secondaryOwner.name.familyName
        : "",
      "birthDate": secondaryOwner.birthDate ? secondaryOwner.birthDate : "",
      "gender": secondaryOwner.gender ? genderTypeMap[secondaryOwner.gender] : "",
      "citizenshipStatus": secondaryOwner.citizenship && secondaryOwner.citizenship.citizenshipStatus
        ? residencyStatusMap[secondaryOwner.citizenship.citizenshipStatus]
        : "",
      "ssNOrTaxID": ssNOrTaxID2 ?
        substring(ssNOrTaxID2, 0, 3) + '-' + substring(ssNOrTaxID2, 3, 5) + '-' + substring(ssNOrTaxID2, 5, 9) :
        "",
      "numberOfDependents": secondaryOwner.numDependents
        ? secondaryOwner.numDependents
        : 0,
      "maritalStatus": secondaryOwner.maritalStatus ? maritalStatusMap[secondaryOwner.maritalStatus] : "",
      "employmentStatus": secondaryOwner.employment && secondaryOwner.employment.employmentStatus
        ? employmentStatusMap[secondaryOwner.employment.employmentStatus]
        : "",
      "occupation": secondaryOwner.employment && secondaryOwner.employment.occupation
        ? secondaryOwner.employment.occupation
        : "",
      "natureOfBusiness": secondaryOwner.employment && secondaryOwner.employment.natureOfBusiness
        ? secondaryOwner.employment.natureOfBusiness
        : "",
      "employer": secondaryOwner.employment && secondaryOwner.employment.employer
        ? secondaryOwner.employment.employer
        : "",
      "yearsEmployed": secondaryOwner.employment && secondaryOwner.employment.yearsEmployed
        ? secondaryOwner.employment.yearsEmployed
        : 0,
      "employerPhoneNumber": secondaryOwner.employment && secondaryOwner.employment.workPhone
        ? secondaryOwner.employment.workPhone
        : "",
      "homeOwnership": secondaryOwner.homeType ? ownershipStatusMap[secondaryOwner.homeType] : "",
      "primaryEmail": secondaryOwner.email ? secondaryOwner.email : "",
      "primaryPhoneNumber": secondaryOwner.contact && secondaryOwner.contact.phone
        ? secondaryOwner.contact.phone
        : ""
    };
    if (secondaryOwner.employment && secondaryOwner.employment.workAddress) {
      let workAddress2 = secondaryOwner.employment.workAddress;
      let employerAddress2 = {
        "line1": workAddress2.streetLine1,
        "line2": workAddress2.streetLine2,
        "city": workAddress2.city,
        "postalCode": workAddress2.postalCode,
        "state": find(stateBO, state, state.code == workAddress2.stateOrProvince),
        "country": find(countryBO, country, country.code2Letters == countryMap[workAddress2.country])
      };
      set(owner2, "employerAddress", employerAddress2);
    }
    if (secondaryOwner.contact) {
      if (secondaryOwner.contact.affiliationsGroup) {
        let affiliationsGroup2 = secondaryOwner.contact.affiliationsGroup;
        let regulatoryDisclosuresV02 = {
          "employedBySecurityIndustryEntity": affiliationsGroup2.nasdGroup ? yesNoMap[affiliationsGroup2.nasdGroup.nasd] : null,
          "typeOfEmployer": affiliationsGroup2.nasdGroup ? brokerRegulatoryMap[affiliationsGroup2.nasdGroup.nasdType] : null,
          "firmNameForEmployee": affiliationsGroup2.nasdGroup ? affiliationsGroup2.nasdGroup.nasdEntity : null,
          "directorOrOfficerInPublicCompany": affiliationsGroup2.companyGroup ? yesNoMap[affiliationsGroup2.companyGroup.publicCompany] : null,
          "officerRole": affiliationsGroup2.companyGroup ? corporateRolesMap[affiliationsGroup2.companyGroup.publicCompanyType] : null,
          "firmNameForOfficer": affiliationsGroup2.companyGroup ? affiliationsGroup2.companyGroup.publicCompanyNameOrSymbol : null,
          "seniorMilitaryGovermentOrPoliticalOfficial": affiliationsGroup2.foreignGroup ? yesNoMap[affiliationsGroup2.foreignGroup.foreignOfficial] : null,
          "foreignOfficialCountry": affiliationsGroup2.foreignGroup ?
            find(countryBO, country, country.code2Letters == countryMap[affiliationsGroup2.foreignGroup.foreignOfficialCountry]) :
            null
        };
        set(owner2, "regulatoryDisclosuresV0", regulatoryDisclosuresV02);
      }
      if (secondaryOwner.contact.legalAddress) {
        let legalAddress2 = {
          "line1": secondaryOwner.contact.legalAddress.streetLine1,
          "line2": secondaryOwner.contact.legalAddress.streetLine2,
          "city": secondaryOwner.contact.legalAddress.city,
          "postalCode": secondaryOwner.contact.legalAddress.postalCode,
          "state": find(stateBO, state, state.code == secondaryOwner.contact.legalAddress.stateOrProvince),
          "country": find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.legalAddress.country])
        };
        set(owner2, "legalAddress", legalAddress2);
      }
      if (secondaryOwner.contact.mailingAddress) {
        let mailingAddress2 = {
          "line1": secondaryOwner.contact.mailingAddress.streetLine1,
          "line2": secondaryOwner.contact.mailingAddress.streetLine2,
          "city": secondaryOwner.contact.mailingAddress.city,
          "postalCode": secondaryOwner.contact.mailingAddress.postalCode,
          "state": find(stateBO, state, state.code == secondaryOwner.contact.mailingAddress.stateOrProvince),
          "country": find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.mailingAddress.country])
        };
        set(owner2, "mailingAddress", mailingAddress2);
      }
      if (secondaryOwner.contact.previousAddress) {
        let previousAddress2 = {
          "line1": secondaryOwner.contact.previousAddress.streetLine1,
          "line2": secondaryOwner.contact.previousAddress.streetLine2,
          "city": secondaryOwner.contact.previousAddress.city,
          "postalCode": secondaryOwner.contact.previousAddress.postalCode,
          "state": find(stateBO, state, state.code == secondaryOwner.contact.previousAddress.stateOrProvince),
          "country": find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.previousAddress.country])
        };
        set(owner2, "previousLegalAddress", previousAddress2);
      }
    }
    if (secondaryOwner.patriotAct) {
      let proofOfIdentity2 = {
        "type": secondaryOwner.patriotAct.idType,
        "idNumber": secondaryOwner.patriotAct.idNumber,
        "issueDate": secondaryOwner.patriotAct.issueDate,
        "expiryDate": secondaryOwner.patriotAct.expirationDate
      };
      set(owner2, "proofOfIdentity", proofOfIdentity2);
    }
    if (secondaryOwner.citizenship && secondaryOwner.citizenship.countryOfResidence) {
      let countryOfResidence2 = find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.citizenship.countryOfResidence]);
      set(owner2, "countryOfResidence", countryOfResidence2);
    }
    secondaryOwners = concat(secondaryOwners, owner2);
  }
  set(accDetails, "secondaryOwners", secondaryOwners);
}
if (apiResponse.beneficiaries && isArray(apiResponse.beneficiaries)) {
  let beneficiaries = [];
  for (let item of apiResponse.beneficiaries) {
    let relationship = item.relationship ? reversedRelationshipMap[item.relationship] : "Other";
    let response = {
      "perStirpes": item.perStirpes == 'NO' ? false : true,
      "percentage": item.percentage,
      "relationship": item.relationshipDescription == "SPOUSE" ? "Spouse" : "Other",
      "beneficiaryType": item.individualOrEntity == "INDIVIDUAL" ? "Person" : "Entity",
      "rmDOption": relationship || "Other",
      "isContingentBeneficiary": item.type == 'CONTINGENT' ? true : false
    };
    let person = {
      "taxIDType": item.taxIdFormat,
      "dateOfBirth": item.birthDate
    };
    if (lowerCase(item.individualOrEntity) == 'entity' || lowerCase(item.individualOrEntity) == 'estate') {
      set(person, 'ein', item.taxId);
    } else {
      let ssNOrTaxID3 = null;
      if (isPresent(item.taxId)) {
        ssNOrTaxID3 = replace(item.taxId, '-', '');
      }
      set(person, 'ssNOrTaxID', substring(ssNOrTaxID3, 0, 3) + '-' + substring(ssNOrTaxID3, 3, 5) + '-' + substring(ssNOrTaxID3, 5, 9));
      set(person, "firstName", item.name ? item.name.givenName : "");
      set(person, "middleName", item.name ? item.name.middleInitial : "");
      set(person, "lastName", item.name ? item.name.familyName : "");
    }
    let addr = {
      "line1": item.address.streetLine1,
      "line2": item.address.streetLine2,
      "city": item.address.city,
      "postalCode": item.address.postalCode,
      "state": find(stateBO, state, state.code == item.address.stateOrProvince),
      "country": find(countryBO, country, country.code2Letters == countryMap[item.address.country])

    };
    set(person, 'legalAddress', addr);
    set(response, 'beneficiary', person);
    beneficiaries = concat(beneficiaries, response);
  }
  set(accDetails, "beneficiaries", beneficiaries);
}
return accDetails;