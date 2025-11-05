// mapping logic 1

set(accDetails, "name", modifiedApiResponse.accountName);
set(accDetails, "nickName", modifiedApiResponse.principalName);
set(accDetails, "accountCustodianStatus", modifiedApiResponse.status);
set(accDetails, "startDate", parseDate(modifiedApiResponse.openedDate, "yyyy-MM-dd"));
set(accDetails, "repCodeLink", isEmpty(repCodeBo) ? accDetails.repCodeLink : repCodeBo[0]);
set(accDetails, "ouLevel1", isEmpty(orgUnitBo) ? accDetails.ouLevel1 : orgUnitBo[0]);

let tradingPrivileges = [];

if (modifiedApiResponse.enableMargin && modifiedApiResponse.enableMargin == 'YES') {
  tradingPrivileges = concat(tradingPrivileges, 'Margin');
}
if (modifiedApiResponse.enableOptions && modifiedApiResponse.enableOptions == 'YES') {
  tradingPrivileges = concat(tradingPrivileges, 'Options');
}

set(accDetails, "tradingPrivileges", tradingPrivileges);
set(accDetails, "initialFundingSource", modifiedApiResponse.fundingFeatures ? maps.financialSourcesMap[modifiedApiResponse.fundingFeatures.fundingSource] : null);
set(accDetails, "otherInitialFundingSource", modifiedApiResponse.fundingFeatures ? modifiedApiResponse.fundingFeatures.fundingSpecifics : null);
set(accDetails, "moneyFundSweepOptIn", modifiedApiResponse.fundingFeatures ? maps.insuranceSweepMap[modifiedApiResponse.fundingFeatures.moneyFundInstructions] : null);
set(accDetails, "cashDividendOption", modifiedApiResponse.fundingFeatures ? maps.cashDividendOptionMap[modifiedApiResponse.fundingFeatures.dividendCashOptions] : null);
set(accDetails, "dividendReinvestmentOption", modifiedApiResponse.fundingFeatures ? maps.dividendReinvestmentMap[modifiedApiResponse.fundingFeatures.dividendDripOptions] : null);
set(accDetails, "annualIncome", modifiedApiResponse.investmentProfile ? maps.incomeCategoryMap[modifiedApiResponse.investmentProfile.annualIncomeRange] : null);
set(accDetails, "netWorthExcludingHome", modifiedApiResponse.investmentProfile ? maps.incomeCategoryMap[modifiedApiResponse.investmentProfile.netWorthRange] : null);
set(accDetails, "liquidAssets", modifiedApiResponse.investmentProfile ? maps.incomeCategoryMap[modifiedApiResponse.investmentProfile.liquidNetWorthRange] : null);
set(accDetails, "federalMarginalTaxRate", modifiedApiResponse.investmentProfile ? toString(modifiedApiResponse.investmentProfile.taxBracket) : null);
set(accDetails, "riskTolerance", modifiedApiResponse.investmentProfile ? maps.investmentRiskMap[modifiedApiResponse.investmentProfile.riskTolerance] : null);
set(accDetails, "estimatedValueOfInvestments", modifiedApiResponse.investmentProfile ? maps.incomeCategoryMap[modifiedApiResponse.investmentProfile.investmentValueRange] : null);
set(accDetails, "investmentObjective", modifiedApiResponse.investmentProfile ? maps.investmentObjectiveMap[modifiedApiResponse.investmentProfile.investmentObjective] : null);
set(accDetails, "investmentExperience", modifiedApiResponse.investmentProfile ? maps.ratingLevelMap[modifiedApiResponse.investmentProfile.investmentKnowledge] : null);
set(accDetails, "liquidityNeeds", modifiedApiResponse.investmentProfile ? maps.experienceMap[modifiedApiResponse.investmentProfile.liquidityNeeds] : null);
set(accDetails, "annualExpenses", modifiedApiResponse.investmentProfile ? modifiedApiResponse.investmentProfile.annualExpenses : 0);
set(accDetails, "specialExpenses", modifiedApiResponse.investmentProfile ? modifiedApiResponse.investmentProfile.specialExpenses : 0);
set(accDetails, "specialExpensesTimeframe", modifiedApiResponse.investmentProfile ? maps.experienceMap[modifiedApiResponse.investmentProfile.specialExpenseTimeFrame] : null);
set(accDetails, "timeHorizon", modifiedApiResponse.investmentProfile ? maps.experienceMap[modifiedApiResponse.investmentProfile.timeHorizon] : null);
set(accDetails, "optionsRiskLevel", modifiedApiResponse.optionsLevel ? maps.optionsRiskLevelMap[modifiedApiResponse.optionsLevel] : null);
set(accDetails, "advisorTradingDiscretion", modifiedApiResponse.discretion);

if(modifiedApiResponse.investmentProfile){
  if (modifiedApiResponse.investmentProfile.annualIncomeOther) {
    set(accDetails, "annualIncomeExact", modifiedApiResponse.investmentProfile.annualIncomeOther);
  }

  if (modifiedApiResponse.investmentProfile.netWorthOther) {
    set(accDetails, "netWorthExcludingHomeExact", modifiedApiResponse.investmentProfile.netWorthOther);
  }

  if (modifiedApiResponse.investmentProfile.liquidNetWorthOther) {
    set(accDetails, "liquidAssetsExact", modifiedApiResponse.investmentProfile.liquidNetWorthOther);
  }
}

let fieldsAssigned = [
  "annualIncomeExact",
  "netWorthExcludingHomeExact",
  "liquidAssetsExact",
  "name",
  "nickName",
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
  "ouLevel1",
  "enableMargin",
  "enableOptions",
  "optionsLevel"
];

// mapping logic 2

if (modifiedApiResponse.accountType != "TRUST_IRREVOCABLE" && modifiedApiResponse.accountType != "TRUST_REVOCABLE") {
  if (isPresent(modifiedApiResponse.individualHolder)) {
    let ssNOrTaxID = null;
    if (isPresent(modifiedApiResponse.individualHolder.ssn)) {
      ssNOrTaxID = replace(modifiedApiResponse.individualHolder.ssn, '-', '');
    }
    if (!accDetails.primaryOwner) {
      set(accDetails, "primaryOwner", {});
    }
    let owner = accDetails.primaryOwner.owner || {};

    set(owner, "firstName", modifiedApiResponse.individualHolder.name && modifiedApiResponse.individualHolder.name.givenName ? modifiedApiResponse.individualHolder.name.givenName : null);
    set(owner, "middleName", modifiedApiResponse.individualHolder.name && modifiedApiResponse.individualHolder.name.middleInitial ? modifiedApiResponse.individualHolder.name.middleInitial : null);
    set(owner, "lastName", modifiedApiResponse.individualHolder.name && modifiedApiResponse.individualHolder.name.familyName ? modifiedApiResponse.individualHolder.name.familyName : null);
    set(owner, "dateOfBirth", modifiedApiResponse.individualHolder.birthDate ? modifiedApiResponse.individualHolder.birthDate : null);
    set(owner, "gender", modifiedApiResponse.individualHolder.gender ? maps.genderTypeMap[modifiedApiResponse.individualHolder.gender] : null);
    set(owner, "citizenshipStatus", modifiedApiResponse.individualHolder.citizenship && modifiedApiResponse.individualHolder.citizenship.citizenshipStatus ? maps.residencyStatusMap[modifiedApiResponse.individualHolder.citizenship.citizenshipStatus] : null);
    set(owner, "ssNOrTaxID", ssNOrTaxID ? substring(ssNOrTaxID, 0, 3) + '-' + substring(ssNOrTaxID, 3, 5) + '-' + substring(ssNOrTaxID, 5, 9) : null);
    set(owner, "numberOfDependents", modifiedApiResponse.individualHolder.numDependents ? modifiedApiResponse.individualHolder.numDependents : 0);
    set(owner, "maritalStatus", modifiedApiResponse.individualHolder.maritalStatus ? maps.maritalStatusMap[modifiedApiResponse.individualHolder.maritalStatus] : null);
    set(owner, "employmentStatus", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.employmentStatus ? maps.employmentStatusMap[modifiedApiResponse.individualHolder.employment.employmentStatus] : null);
    set(owner, "occupation", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.occupation ? modifiedApiResponse.individualHolder.employment.occupation : null);
    set(owner, "natureOfBusiness", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.natureOfBusiness ? modifiedApiResponse.individualHolder.employment.natureOfBusiness : null);
    set(owner, "employer", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.employer ? modifiedApiResponse.individualHolder.employment.employer : null);
    set(owner, "yearsEmployed", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.yearsEmployed ? modifiedApiResponse.individualHolder.employment.yearsEmployed : 0);
    set(owner, "yeMployed", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.yearsEmployed ? modifiedApiResponse.individualHolder.employment.yearsEmployed : 0);
    set(owner, "employerPhoneNumber", modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.workPhone ? modifiedApiResponse.individualHolder.employment.workPhone : null);
    set(owner, "homeOwnership", modifiedApiResponse.individualHolder.homeType ? maps.ownershipStatusMap[modifiedApiResponse.individualHolder.homeType] : null);
    set(owner, "primaryEmail", modifiedApiResponse.individualHolder.email ? modifiedApiResponse.individualHolder.email : null);
    set(owner, "primaryPhoneNumber", modifiedApiResponse.individualHolder.contact && modifiedApiResponse.individualHolder.contact.phone ? modifiedApiResponse.individualHolder.contact.phone : null);

    set(owner, "investmentExperienceEquities", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.stocksExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.stocksExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceEquitiesTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.stocksExperience ? toString(modifiedApiResponse.investmentProfile.stocksExperience.transactionsPerYear) : null);
    set(owner, "investmentExperienceMutualFunds", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.mutualFundsExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.mutualFundsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceMutualFundsTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.mutualFundsExperience ? modifiedApiResponse.investmentProfile.mutualFundsExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceFixedIncome", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.bondsExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.bondsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceFixedIncomeTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.bondsExperience ? modifiedApiResponse.investmentProfile.bondsExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceOptions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.optionsExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.optionsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceOptionsTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.optionsExperience ? toString(modifiedApiResponse.investmentProfile.optionsExperience.transactionsPerYear) : null);
    set(owner, "investExperienceFutures", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.futuresExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.futuresExperience.assetExperienceRange] : null);
    set(owner, "investExperienceFuturesTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.futuresExperience ? modifiedApiResponse.investmentProfile.futuresExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceAnnuities", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.annuitiesExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.annuitiesExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceAnnuitiesTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.annuitiesExperience ? modifiedApiResponse.investmentProfile.annuitiesExperience.transactionsPerYear : null);
    set(owner, "investExperienceAlternatives", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.alternativeInvestmentsExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.alternativeInvestmentsExperience.assetExperienceRange] : null);
    set(owner, "investExperienceAlternativesTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.alternativeInvestmentsExperience ? modifiedApiResponse.investmentProfile.alternativeInvestmentsExperience.transactionsPerYear : null);
    set(owner, "investExperienceMargin", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.marginsExperience ? maps.assetExperienceRangeMap[modifiedApiResponse.investmentProfile.marginsExperience.assetExperienceRange] : null);
    set(owner, "investExperienceMarginTransactions", modifiedApiResponse.investmentProfile && modifiedApiResponse.investmentProfile.marginsExperience ? modifiedApiResponse.investmentProfile.marginsExperience.transactionsPerYear : null);
    set(owner, "backupWithholdingExemptPayeeCode", modifiedApiResponse.w9 && modifiedApiResponse.w9.exemptPayee ? modifiedApiResponse.w9.exemptPayee : null);
    set(owner, "faTCAReportingExemptionCode", modifiedApiResponse.w9 && modifiedApiResponse.w9.factaCode ? modifiedApiResponse.w9.factaCode : null);

    if (modifiedApiResponse.individualHolder.employment && modifiedApiResponse.individualHolder.employment.workAddress) {
      let workAddress = modifiedApiResponse.individualHolder.employment.workAddress;
      let employerAddress = owner.employerAddress || {};

      set(employerAddress, "line1", workAddress.streetLine1);
      set(employerAddress, "line2", workAddress.streetLine2);
      set(employerAddress, "city", workAddress.city);
      set(employerAddress, "postalCode", workAddress.postalCode);
      set(employerAddress, "state", find(stateBO, state, state.code == workAddress.stateOrProvince));
      set(employerAddress, "country", find(countryBO, country, country.code2Letters == countryMap[workAddress.country]));

      set(owner, "employerAddress", employerAddress);
    }

    if (modifiedApiResponse.individualHolder.contact) {
      if (modifiedApiResponse.individualHolder.contact.legalAddress) {
        let legalAddress = owner.legalAddress || {};

        set(legalAddress, "line1", modifiedApiResponse.individualHolder.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", modifiedApiResponse.individualHolder.contact.legalAddress.streetLine2);
        set(legalAddress, "city", modifiedApiResponse.individualHolder.contact.legalAddress.city);
        set(legalAddress, "postalCode", modifiedApiResponse.individualHolder.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.individualHolder.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.individualHolder.contact.legalAddress.country]));

        set(owner, "legalAddress", legalAddress);
      }
      if (modifiedApiResponse.individualHolder.contact.mailingAddress) {
        let mailingAddress = owner.mailingAddress || {};
        set(mailingAddress, "line1", modifiedApiResponse.individualHolder.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", modifiedApiResponse.individualHolder.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", modifiedApiResponse.individualHolder.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", modifiedApiResponse.individualHolder.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.individualHolder.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.individualHolder.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }
      if (modifiedApiResponse.individualHolder.contact.previousAddress) {
        let previousAddress = owner.previousLegalAddress || {};

        set(previousAddress, "line1", modifiedApiResponse.individualHolder.contact.previousAddress.streetLine1);
        set(previousAddress, "line2", modifiedApiResponse.individualHolder.contact.previousAddress.streetLine2);
        set(previousAddress, "city", modifiedApiResponse.individualHolder.contact.previousAddress.city);
        set(previousAddress, "postalCode", modifiedApiResponse.individualHolder.contact.previousAddress.postalCode);
        set(previousAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.individualHolder.contact.previousAddress.stateOrProvince));
        set(previousAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.individualHolder.contact.previousAddress.country]));

        set(owner, "previousLegalAddress", previousAddress);
      }
      if (modifiedApiResponse.individualHolder.contact.affiliationsGroup) {
        if (modifiedApiResponse.individualHolder.contact.affiliationsGroup.nasdGroup) {
          let securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", modifiedApiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", modifiedApiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasdEntity);
          set(securitiesIndustryAffiliation, "enabled", modifiedApiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasd);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (modifiedApiResponse.individualHolder.contact.affiliationsGroup.companyGroup) {
          let publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", modifiedApiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(publicCompanyOfficial, "relationshipOfOfficer", modifiedApiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", modifiedApiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyTypeDescription);
          set(publicCompanyOfficial, "enabled", modifiedApiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompany);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (modifiedApiResponse.individualHolder.contact.affiliationsGroup.foreignGroup) {
          let foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.individualHolder.contact.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(foreignOfficial, "enabled", modifiedApiResponse.individualHolder.contact.affiliationsGroup.foreignGroup.foreignOfficial);
          set(owner, "foreignOfficial", foreignOfficial);
        }
      }
    }

    if (modifiedApiResponse.individualHolder.patriotAct) {
      let proofOfIdentity = owner.proofOfIdentity || {};

      set(proofOfIdentity, "type", modifiedApiResponse.individualHolder.patriotAct.idType);
      set(proofOfIdentity, "idNumber", modifiedApiResponse.individualHolder.patriotAct.idNumber);
      set(proofOfIdentity, "issueDate", modifiedApiResponse.individualHolder.patriotAct.issueDate);
      set(proofOfIdentity, "expiryDate", modifiedApiResponse.individualHolder.patriotAct.expirationDate);
      set(proofOfIdentity, "issuingCountry", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.individualHolder.patriotAct.issuedByCountry]));

      set(owner, "proofOfIdentity", proofOfIdentity);
    }
    if (modifiedApiResponse.individualHolder.citizenship && modifiedApiResponse.individualHolder.citizenship.countryOfResidence) {
      let countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.individualHolder.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    if (modifiedApiResponse.individualHolder.citizenship && modifiedApiResponse.individualHolder.citizenship.taxJurisdiction) {
      let taxJurisdiction = find(countryBO, country, country.code2Letters == modifiedApiResponse.individualHolder.citizenship.taxJurisdiction);
      set(owner, "countryOfTaxJurisdiction", taxJurisdiction);
    }
    set(accDetails.primaryOwner, "owner", owner);

    let fieldsAssigned2 = [
      "primaryOwner.owner.firstName",
      "primaryOwner.owner.middleName",
      "primaryOwner.owner.lastName",
      "primaryOwner.owner.dateOfBirth",
      "primaryOwner.owner.gender",
      "primaryOwner.owner.citizenshipStatus",
      "primaryOwner.owner.ssNOrTaxID",
      "primaryOwner.owner.numberOfDependents",
      "primaryOwner.owner.maritalStatus",
      "primaryOwner.owner.employmentStatus",
      "primaryOwner.owner.occupation",
      "primaryOwner.owner.natureOfBusiness",
      "primaryOwner.owner.employer",
      "primaryOwner.owner.yearsEmployed",
      "primaryOwner.owner.yeMployed",
      "primaryOwner.owner.employerPhoneNumber",
      "primaryOwner.owner.homeOwnership",
      "primaryOwner.owner.primaryEmail",
      "primaryOwner.owner.primaryPhoneNumber",
      "primaryOwner.owner.investmentExperienceEquities",
      "primaryOwner.owner.investmentExperienceEquitiesTransactions",
      "primaryOwner.owner.investmentExperienceMutualFunds",
      "primaryOwner.owner.investmentExperienceMutualFundsTransactions",
      "primaryOwner.owner.investmentExperienceFixedIncome",
      "primaryOwner.owner.investmentExperienceFixedIncomeTransactions",
      "primaryOwner.owner.investmentExperienceOptions",
      "primaryOwner.owner.investmentExperienceOptionsTransactions",
      "primaryOwner.owner.investExperienceFutures",
      "primaryOwner.owner.investExperienceFuturesTransactions",
      "primaryOwner.owner.investmentExperienceAnnuities",
      "primaryOwner.owner.investmentExperienceAnnuitiesTransactions",
      "primaryOwner.owner.investExperienceAlternatives",
      "primaryOwner.owner.investExperienceAlternativesTransactions",
      "primaryOwner.owner.investExperienceMargin",
      "primaryOwner.owner.investExperienceMarginTransactions",
      "primaryOwner.owner.backupWithholdingExemptPayeeCode",
      "primaryOwner.owner.faTCAReportingExemptionCode",

      "primaryOwner.owner.employerAddress.line1",
      "primaryOwner.owner.employerAddress.line2",
      "primaryOwner.owner.employerAddress.city",
      "primaryOwner.owner.employerAddress.postalCode",
      "primaryOwner.owner.employerAddress.state",
      "primaryOwner.owner.employerAddress.country",

      "primaryOwner.owner.legalAddress.line1",
      "primaryOwner.owner.legalAddress.line2",
      "primaryOwner.owner.legalAddress.city",
      "primaryOwner.owner.legalAddress.postalCode",
      "primaryOwner.owner.legalAddress.state",
      "primaryOwner.owner.legalAddress.country",

      "primaryOwner.owner.mailingAddress.line1",
      "primaryOwner.owner.mailingAddress.line2",
      "primaryOwner.owner.mailingAddress.city",
      "primaryOwner.owner.mailingAddress.postalCode",
      "primaryOwner.owner.mailingAddress.state",
      "primaryOwner.owner.mailingAddress.country",

      "primaryOwner.owner.previousLegalAddress.line1",
      "primaryOwner.owner.previousLegalAddress.line2",
      "primaryOwner.owner.previousLegalAddress.city",
      "primaryOwner.owner.previousLegalAddress.postalCode",
      "primaryOwner.owner.previousLegalAddress.state",
      "primaryOwner.owner.previousLegalAddress.country",

      "primaryOwner.owner.proofOfIdentity.type",
      "primaryOwner.owner.proofOfIdentity.idNumber",
      "primaryOwner.owner.proofOfIdentity.issueDate",
      "primaryOwner.owner.proofOfIdentity.expiryDate",
      "primaryOwner.owner.proofOfIdentity.issuingCountry",

      "primaryOwner.owner.countryOfResidence",
      "primaryOwner.owner.securitiesIndustryAffiliation.typeOfEmployer",
      "primaryOwner.owner.securitiesIndustryAffiliation.firmNameForEmployee",
      "primaryOwner.owner.publicCompanyOfficial.firmNameForOfficer",
      "primaryOwner.owner.publicCompanyOfficial.relationshipOfOfficer",
      "primaryOwner.owner.publicCompanyOfficial.firmTickerForOfficer",
      "primaryOwner.owner.foreignOfficial.foreignCountryName"
    ];

    fieldsAssigned = concat(fieldsAssigned, fieldsAssigned2);
  }
}

// mapping logic 3

if (modifiedApiResponse.trustedContact) {
  let trustedContact = accDetails.primaryOwner && accDetails.primaryOwner.trustedContact ? accDetails.primaryOwner.trustedContact : {};
  set(accDetails.primaryOwner, "includeTrustedContact", true);

  set(trustedContact, "fullName", modifiedApiResponse.trustedContact.name);
  set(trustedContact, "primaryEmail", modifiedApiResponse.trustedContact.email);
  set(trustedContact, "primaryPhoneNumber", modifiedApiResponse.trustedContact.phone);

  if (modifiedApiResponse.trustedContact.address){
    if (!trustedContact.mailingAddress) {
        set(trustedContact, "mailingAddress", {});
    }
    set(trustedContact.mailingAddress, "line1", modifiedApiResponse.trustedContact.address.streetLine1);
    set(trustedContact.mailingAddress, "line2", modifiedApiResponse.trustedContact.address.streetLine2);
    set(trustedContact.mailingAddress, "city", modifiedApiResponse.trustedContact.address.city);
    set(trustedContact.mailingAddress, "postalCode", modifiedApiResponse.trustedContact.address.postalCode);
    set(trustedContact.mailingAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.trustedContact.address.stateOrProvince));
    set(trustedContact.mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.trustedContact.address.country]));
  }

  set(accDetails.primaryOwner, "trustedContactRelationship", modifiedApiResponse.trustedContact.relationship);
  set(accDetails.primaryOwner, "trustedContact", trustedContact);
  fieldsAssigned = concat(fieldsAssigned, [
    "primaryOwner.includeTrustedContact",
    "primaryOwner.trustedContactRelationship",
    "primaryOwner.owner.trustedContact.fullName",
    "primaryOwner.owner.trustedContact.primaryPhoneNumber",
    "primaryOwner.owner.trustedContact.primaryEmail",
    "primaryOwner.owner.trustedContact.mailingAddress.line1",
    "primaryOwner.owner.trustedContact.mailingAddress.line2",
    "primaryOwner.owner.trustedContact.mailingAddress.city",
    "primaryOwner.owner.trustedContact.mailingAddress.postalCode",
    "primaryOwner.owner.trustedContact.mailingAddress.state",
    "primaryOwner.owner.trustedContact.mailingAddress.country",
  ]);
}
if (modifiedApiResponse.jointAccount && modifiedApiResponse.jointAccount.jointTenantMarried) {
  set(accDetails.primaryOwner, "spouseIsAJointOwner", modifiedApiResponse.jointAccount.jointTenantMarried == 'YES' ? true : false);
  fieldsAssigned = concat(fieldsAssigned, [
    "primaryOwner.spouseIsAJointOwner"
  ]);
}

if (modifiedApiResponse.beneficiaries && isArray(modifiedApiResponse.beneficiaries)) {
  let beneficiaries = [];
  let contingentBeneficiaries = [];
  let i = 0;
  for (let item of modifiedApiResponse.beneficiaries) {
    let benObj = {};
    set(benObj, "perStirpes", item.perStirpes == 'NO' ? false : true);
    set(benObj, "percentage", item.percentage);
    set(benObj, "relationship", item.relationshipDescription);
    set(benObj, "beneficiaryType", item.individualOrEntity == "INDIVIDUAL" ? "Person" : "Entity");
    set(benObj, "rmDOption", item.relationship);
    set(benObj, "isContingentBeneficiary", item.type == 'CONTINGENT' ? true : false);

    let person = {
      "taxIDType": item.taxIdFormat,
      "dateOfBirth": item.birthDate
    };
    if (lowerCase(item.individualOrEntity) == 'entity' || lowerCase(item.individualOrEntity) == 'estate') {
      set(person, 'ein', item.taxId);
      set(person, "fullName", item.entityName);
    } else {
      if (isPresent(item.taxId)) {
        let ssNOrTaxID3 = replace(item.taxId, '-', '');
        set(person, 'ssNOrTaxID', skipError(substring(ssNOrTaxID3, 0, 3) + '-' + substring(ssNOrTaxID3, 3, 5) + '-' + substring(ssNOrTaxID3, 5, 9), ssNOrTaxID3));
      }
      set(person, "firstName", item.name ? item.name.givenName : "");
      set(person, "middleName", item.name ? item.name.middleInitial : "");
      set(person, "lastName", item.name ? item.name.familyName : "");
    }
    if (item.address){
      let addr = {
        "line1": item.address.streetLine1,
        "line2": item.address.streetLine2,
        "city": item.address.city,
        "postalCode": item.address.postalCode,
        "state": find(stateBO, state, state.code == item.address.stateOrProvince),
        "country": find(countryBO, country, country.code2Letters == countryMap[item.address.country])
      };
      set(person, 'legalAddress', addr);
    }
    set(benObj, 'beneficiary', person);
    if (item.type == 'CONTINGENT') {
      contingentBeneficiaries = concat(contingentBeneficiaries, benObj);
    } else {
      beneficiaries = concat(beneficiaries, benObj);
    }
    i = i + 1;
  }
  set(accDetails, "beneficiaries", beneficiaries);
  set(accDetails, "contingentBeneficiaries", contingentBeneficiaries);
  // TODO: Add fields to fieldsAssigned
  // fieldsAssigned = concat(fieldsAssigned, [  
  //   "beneficiaries.perStirpes",
  //   "beneficiaries.percentage",
  //   "beneficiaries.relationship",
  //   "beneficiaries.beneficiaryType",
  //   "beneficiaries.rmDOption",
  //   "beneficiaries.isContingentBeneficiary", 
  //   "beneficiaries.beneficiary.firstName",
  //   "beneficiaries.beneficiary.middleName",
  //   "beneficiaries.beneficiary.lastName",
  //   "beneficiaries.beneficiary.fullName",
  //   "beneficiaries.beneficiary.ein",
  //   "beneficiaries.beneficiary.taxIDType",
  //   "beneficiaries.beneficiary.dateOfBirth",
  //   "beneficiaries.beneficiary.legalAddress.line1",
  //   "beneficiaries.beneficiary.legalAddress.line2",
  //   "beneficiaries.beneficiary.legalAddress.city",
  //   "beneficiaries.beneficiary.legalAddress.postalCode",
  //   "beneficiaries.beneficiary.legalAddress.state",
  //   "beneficiaries.beneficiary.legalAddress.country.code2Letters"
  // ]);
}


// mapping logic 4

if (modifiedApiResponse.accountType == "TRUST_IRREVOCABLE" || modifiedApiResponse.accountType == "TRUST_REVOCABLE") {
  if (isPresent(modifiedApiResponse.entityHolder)) {
    owner = accDetails.primaryOwner.owner;
    set(owner, "fullName", modifiedApiResponse.entityHolder.entityName);
    set(owner, "dateOfBirth", modifiedApiResponse.entityHolder.entityFormationDate);
    set(owner, "citizenshipStatus", modifiedApiResponse.entityHolder.citizenship && modifiedApiResponse.entityHolder.citizenship.citizenshipStatus ? maps.residencyStatusMap[modifiedApiResponse.entityHolder.citizenship.citizenshipStatus] : "");
    set(owner, "ein", modifiedApiResponse.entityHolder.itin);
    if (modifiedApiResponse.entityHolder.contact) {
      set(owner, "businessPhoneNumber", modifiedApiResponse.entityHolder.contact.phone);

      if (modifiedApiResponse.entityHolder.contact.legalAddress) {
        legalAddress = owner.legalAddress || {};

        set(legalAddress, "line1", modifiedApiResponse.entityHolder.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", modifiedApiResponse.entityHolder.contact.legalAddress.streetLine2);
        set(legalAddress, "city", modifiedApiResponse.entityHolder.contact.legalAddress.city);
        set(legalAddress, "postalCode", modifiedApiResponse.entityHolder.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.entityHolder.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.entityHolder.contact.legalAddress.country]));

        set(owner, "legalAddress", legalAddress);
      }
      if (modifiedApiResponse.entityHolder.contact.mailingAddress) {
        mailingAddress = owner.mailingAddress || {};
        set(mailingAddress, "line1", modifiedApiResponse.entityHolder.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", modifiedApiResponse.entityHolder.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", modifiedApiResponse.entityHolder.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", modifiedApiResponse.entityHolder.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.entityHolder.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.entityHolder.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }
      if (modifiedApiResponse.entityHolder.contact.previousAddress) {
        previousAddress = owner.previousLegalAddress || {};

        set(previousAddress, "line1", modifiedApiResponse.entityHolder.contact.previousAddress.streetLine1);
        set(previousAddress, "line2", modifiedApiResponse.entityHolder.contact.previousAddress.streetLine2);
        set(previousAddress, "city", modifiedApiResponse.entityHolder.contact.previousAddress.city);
        set(previousAddress, "postalCode", modifiedApiResponse.entityHolder.contact.previousAddress.postalCode);
        set(previousAddress, "state", find(stateBO, state, state.code == modifiedApiResponse.entityHolder.contact.previousAddress.stateOrProvince));
        set(previousAddress, "country", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.entityHolder.contact.previousAddress.country]));

        set(owner, "previousLegalAddress", previousAddress);
      }
      if (modifiedApiResponse.entityHolder.contact.affiliationsGroup) {
        if (modifiedApiResponse.entityHolder.contact.affiliationsGroup.nasdGroup) {
          securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", modifiedApiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", modifiedApiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasdEntity);
          set(securitiesIndustryAffiliation, "enabled", modifiedApiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasd);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (modifiedApiResponse.entityHolder.contact.affiliationsGroup.companyGroup) {
          publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", modifiedApiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(publicCompanyOfficial, "relationshipOfOfficer", modifiedApiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", modifiedApiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyTypeDescription);
          set(publicCompanyOfficial, "enabled", modifiedApiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompany);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (modifiedApiResponse.entityHolder.contact.affiliationsGroup.foreignGroup) {
          foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.entityHolder.contact.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(foreignOfficial, "enabled", modifiedApiResponse.entityHolder.contact.affiliationsGroup.foreignGroup.foreignOfficial);
          set(owner, "foreignOfficial", foreignOfficial);
        }

      }
    }
    if (modifiedApiResponse.entityHolder.citizenship && modifiedApiResponse.entityHolder.citizenship.countryOfResidence) {
      countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[modifiedApiResponse.entityHolder.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    if (modifiedApiResponse.entityHolder.citizenship && modifiedApiResponse.entityHolder.citizenship.taxJurisdiction) {
      taxJurisdiction = find(countryBO, country, country.code2Letters == modifiedApiResponse.entityHolder.citizenship.taxJurisdiction);
      set(owner, "countryOfTaxJurisdiction", taxJurisdiction);
    }
    set(accDetails.primaryOwner, "owner", owner);
    let fieldsAssigned3 = [
      "primaryOwner.owner.fullName",
      "primaryOwner.owner.dateOfBirth",
      "primaryOwner.owner.citizenshipStatus",
      "primaryOwner.owner.ein",
      "primaryOwner.owner.businessPhoneNumber",

      "primaryOwner.owner.legalAddress.line1",
      "primaryOwner.owner.legalAddress.line2",
      "primaryOwner.owner.legalAddress.city",
      "primaryOwner.owner.legalAddress.postalCode",
      "primaryOwner.owner.legalAddress.state",
      "primaryOwner.owner.legalAddress.country",

      "primaryOwner.owner.mailingAddress.line1",
      "primaryOwner.owner.mailingAddress.line2",
      "primaryOwner.owner.mailingAddress.city",
      "primaryOwner.owner.mailingAddress.postalCode",
      "primaryOwner.owner.mailingAddress.state",
      "primaryOwner.owner.mailingAddress.country",

      "primaryOwner.owner.previousLegalAddress.line1",
      "primaryOwner.owner.previousLegalAddress.line2",
      "primaryOwner.owner.previousLegalAddress.city",
      "primaryOwner.owner.previousLegalAddress.postalCode",
      "primaryOwner.owner.previousLegalAddress.state",
      "primaryOwner.owner.previousLegalAddress.country",

      "primaryOwner.owner.proofOfIdentity.type",
      "primaryOwner.owner.proofOfIdentity.idNumber",
      "primaryOwner.owner.proofOfIdentity.issueDate",
      "primaryOwner.owner.proofOfIdentity.expiryDate",
      "primaryOwner.owner.proofOfIdentity.issuingCountry",

      "primaryOwner.owner.countryOfResidence",
      "primaryOwner.owner.securitiesIndustryAffiliation.typeOfEmployer",
      "primaryOwner.owner.securitiesIndustryAffiliation.firmNameForEmployee",
      "primaryOwner.owner.publicCompanyOfficial.firmNameForOfficer",
      "primaryOwner.owner.publicCompanyOfficial.relationshipOfOfficer",
      "primaryOwner.owner.publicCompanyOfficial.firmTickerForOfficer",
      "primaryOwner.owner.foreignOfficial.foreignCountryName"
    ];
    fieldsAssigned = concat(fieldsAssigned, fieldsAssigned3);
  }
}

//mapping logic 5

if (modifiedApiResponse.coHolders && isArray(modifiedApiResponse.coHolders)) {
  let secondaryOwners = [];

  for (let secondaryOwner of modifiedApiResponse.coHolders) {
    let secOwner = find(accDetails.secondaryOwners, so, so.id == secondaryOwner.externalClientId) || {};
    owner = secOwner.owner || {};
    set(owner, "firstName", secondaryOwner.name && secondaryOwner.name.givenName ? secondaryOwner.name.givenName : null);
    set(owner, "middleName", secondaryOwner.name && secondaryOwner.name.middleInitial ? secondaryOwner.name.middleInitial : null);
    set(owner, "lastName", secondaryOwner.name && secondaryOwner.name.familyName ? secondaryOwner.name.familyName : null);
    set(owner, "dateOfBirth", secondaryOwner.birthDate ? secondaryOwner.birthDate : null);
    set(owner, "gender", secondaryOwner.gender ? maps.genderTypeMap[secondaryOwner.gender] : null);
    set(owner, "citizenshipStatus", secondaryOwner.citizenship && secondaryOwner.citizenship.citizenshipStatus ? maps.residencyStatusMap[secondaryOwner.citizenship.citizenshipStatus] : null);
    if (isPresent(secondaryOwner.ssn)) {
      let ssNOrTaxID2 = replace(secondaryOwner.ssn, '-', '');
      set(owner, "ssNOrTaxID", skipError(substring(ssNOrTaxID2, 0, 3) + '-' + substring(ssNOrTaxID2, 3, 5) + '-' + substring(ssNOrTaxID2, 5, 9), ssNOrTaxID2));
    }
    set(owner, "numberOfDependents", secondaryOwner.numDependents ? secondaryOwner.numDependents : 0);
    set(owner, "maritalStatus", secondaryOwner.maritalStatus ? maps.maritalStatusMap[secondaryOwner.maritalStatus] : null);
    set(owner, "employmentStatus", secondaryOwner.employment && secondaryOwner.employment.employmentStatus ? maps.employmentStatusMap[secondaryOwner.employment.employmentStatus] : null);
    set(owner, "occupation", secondaryOwner.employment && secondaryOwner.employment.occupation ? secondaryOwner.employment.occupation : null);
    set(owner, "natureOfBusiness", secondaryOwner.employment && secondaryOwner.employment.natureOfBusiness ? secondaryOwner.employment.natureOfBusiness : null);
    set(owner, "employer", secondaryOwner.employment && secondaryOwner.employment.employer ? secondaryOwner.employment.employer : null);
    set(owner, "yearsEmployed", secondaryOwner.employment && secondaryOwner.employment.yearsEmployed ? secondaryOwner.employment.yearsEmployed : 0);
    set(owner, "yeMployed", secondaryOwner.employment && secondaryOwner.employment.yearsEmployed ? secondaryOwner.employment.yearsEmployed : 0);
    set(owner, "employerPhoneNumber", secondaryOwner.employment && secondaryOwner.employment.workPhone ? secondaryOwner.employment.workPhone : null);
    set(owner, "homeOwnership", secondaryOwner.homeType ? maps.ownershipStatusMap[secondaryOwner.homeType] : null);
    set(owner, "primaryEmail", secondaryOwner.email ? secondaryOwner.email : null);
    set(owner, "primaryPhoneNumber", secondaryOwner.contact && secondaryOwner.contact.phone ? secondaryOwner.contact.phone : null);

    if (secondaryOwner.employment && secondaryOwner.employment.workAddress) {
      let workAddress2 = secondaryOwner.employment.workAddress;
      employerAddress = owner.employerAddress || {};
      set(employerAddress, "line1", workAddress2.streetLine1);
      set(employerAddress, "line2", workAddress2.streetLine2);
      set(employerAddress, "city", workAddress2.city);
      set(employerAddress, "postalCode", workAddress2.postalCode);
      set(employerAddress, "state", find(stateBO, state, state.code == workAddress2.stateOrProvince));
      set(employerAddress, "country", find(countryBO, country, country.code2Letters == countryMap[workAddress2.country]));
      set(owner, "employerAddress", employerAddress);
    }

    if (secondaryOwner.contact) {
      if (secondaryOwner.affiliationsGroup) {
        if (secondaryOwner.affiliationsGroup.nasdGroup) {
          securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", secondaryOwner.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", secondaryOwner.affiliationsGroup.nasdGroup.nasdEntity);
          set(securitiesIndustryAffiliation, "enabled", secondaryOwner.affiliationsGroup.nasdGroup.nasd);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (secondaryOwner.affiliationsGroup.companyGroup) {
          publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(publicCompanyOfficial, "relationshipOfOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyTypeDescription);
          set(publicCompanyOfficial, "enabled", secondaryOwner.affiliationsGroup.companyGroup.publicCompany);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (secondaryOwner.affiliationsGroup.foreignGroup) {
          foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(foreignOfficial, "enabled", secondaryOwner.affiliationsGroup.foreignGroup.foreignOfficial);
          set(owner, "foreignOfficial", foreignOfficial);
        }
      }

      if (secondaryOwner.contact.legalAddress) {
        legalAddress = owner.legalAddress || {};
        set(legalAddress, "line1", secondaryOwner.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", secondaryOwner.contact.legalAddress.streetLine2);
        set(legalAddress, "city", secondaryOwner.contact.legalAddress.city);
        set(legalAddress, "postalCode", secondaryOwner.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == secondaryOwner.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.legalAddress.country]));
        set(owner, "legalAddress", legalAddress);
      }

      if (secondaryOwner.contact.mailingAddress) {
        mailingAddress = owner.mailingAddress || {};
        set(mailingAddress, "line1", secondaryOwner.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", secondaryOwner.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", secondaryOwner.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", secondaryOwner.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == secondaryOwner.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }

      if (secondaryOwner.contact.previousAddress) {
        previousAddress = owner.previousLegalAddress || {};
        set(previousAddress, "line1", secondaryOwner.contact.previousAddress.streetLine1);
        set(previousAddress, "line2", secondaryOwner.contact.previousAddress.streetLine2);
        set(previousAddress, "city", secondaryOwner.contact.previousAddress.city);
        set(previousAddress, "postalCode", secondaryOwner.contact.previousAddress.postalCode);
        set(previousAddress, "state", find(stateBO, state, state.code == secondaryOwner.contact.previousAddress.stateOrProvince));
        set(previousAddress, "country", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.previousAddress.country]));
        set(owner, "previousLegalAddress", previousAddress);
      }
    }

    if (secondaryOwner.patriotAct) {
      proofOfIdentity = owner.proofOfIdentity || {};
      set(proofOfIdentity, "type", secondaryOwner.patriotAct.idType);
      set(proofOfIdentity, "idNumber", secondaryOwner.patriotAct.idNumber);
      set(proofOfIdentity, "issueDate", secondaryOwner.patriotAct.issueDate);
      set(proofOfIdentity, "expiryDate", secondaryOwner.patriotAct.expirationDate);
      set(proofOfIdentity, "issuingCountry", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.patriotAct.issuedByCountry]));
      set(owner, "proofOfIdentity", proofOfIdentity);
    }

    if (secondaryOwner.citizenship && secondaryOwner.citizenship.countryOfResidence) {
      countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    if (secondaryOwner.citizenship && secondaryOwner.citizenship.taxJurisdiction) {
      taxJurisdiction = find(countryBO, country, country.code2Letters == secondaryOwner.citizenship.taxJurisdiction);
      set(owner, "countryOfTaxJurisdiction", taxJurisdiction);
    }

    if (secondaryOwner.trustedContact) {
      trustedContact = secOwner && secOwner.trustedContact ? secOwner.trustedContact : {};
      set(secOwner, "includeTrustedContact", true);

      set(trustedContact, "fullName", secondaryOwner.trustedContact.name);
      set(trustedContact, "primaryEmail", secondaryOwner.trustedContact.email);
      set(trustedContact, "primaryPhoneNumber", secondaryOwner.trustedContact.phone);

      if (!trustedContact.mailingAddress) {
        set(trustedContact, "mailingAddress", {});
      }
      if (secondaryOwner.trustedContact.address) {
        set(trustedContact.mailingAddress, "line1", secondaryOwner.trustedContact.address.streetLine1);
        set(trustedContact.mailingAddress, "line2", secondaryOwner.trustedContact.address.streetLine2);
        set(trustedContact.mailingAddress, "city", secondaryOwner.trustedContact.address.city);
        set(trustedContact.mailingAddress, "postalCode", secondaryOwner.trustedContact.address.postalCode);
        set(trustedContact.mailingAddress, "state", find(stateBO, state, state.code == secondaryOwner.trustedContact.address.stateOrProvince));
        set(trustedContact.mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.trustedContact.address.country]));
      }
      set(secOwner, "trustedContactRelationship", secondaryOwner.trustedContact.relationship);
      set(secOwner, "trustedContact", trustedContact);
    }
    set(secOwner, "owner", owner);
    secondaryOwners = concat(secondaryOwners, secOwner);
  }
  let fieldsAssigned4 = [
    "secondaryOwners.owner.firstName",
    "secondaryOwners.owner.middleName",
    "secondaryOwners.owner.lastName",
    "secondaryOwners.owner.dateOfBirth",
    "secondaryOwners.owner.gender",
    "secondaryOwners.owner.citizenshipStatus",
    "secondaryOwners.owner.ssNOrTaxID",
    "secondaryOwners.owner.numberOfDependents",
    "secondaryOwners.owner.maritalStatus",
    "secondaryOwners.owner.employmentStatus",
    "secondaryOwners.owner.occupation",
    "secondaryOwners.owner.natureOfBusiness",
    "secondaryOwners.owner.employer",
    "secondaryOwners.owner.yearsEmployed",
    "secondaryOwners.owner.yeMployed",
    "secondaryOwners.owner.employerPhoneNumber",
    "secondaryOwners.owner.homeOwnership",
    "secondaryOwners.owner.primaryEmail",
    "secondaryOwners.owner.primaryPhoneNumber",

    "secondaryOwners.owner.employerAddress.line1",
    "secondaryOwners.owner.employerAddress.line2",
    "secondaryOwners.owner.employerAddress.city",
    "secondaryOwners.owner.employerAddress.postalCode",
    "secondaryOwners.owner.employerAddress.state",
    "secondaryOwners.owner.employerAddress.country",

    "secondaryOwners.owner.legalAddress.line1",
    "secondaryOwners.owner.legalAddress.line2",
    "secondaryOwners.owner.legalAddress.city",
    "secondaryOwners.owner.legalAddress.postalCode",
    "secondaryOwners.owner.legalAddress.state",
    "secondaryOwners.owner.legalAddress.country",

    "secondaryOwners.owner.mailingAddress.line1",
    "secondaryOwners.owner.mailingAddress.line2",
    "secondaryOwners.owner.mailingAddress.city",
    "secondaryOwners.owner.mailingAddress.postalCode",
    "secondaryOwners.owner.mailingAddress.state",
    "secondaryOwners.owner.mailingAddress.country",

    "secondaryOwners.owner.previousLegalAddress.line1",
    "secondaryOwners.owner.previousLegalAddress.line2",
    "secondaryOwners.owner.previousLegalAddress.city",
    "secondaryOwners.owner.previousLegalAddress.postalCode",
    "secondaryOwners.owner.previousLegalAddress.state",
    "secondaryOwners.owner.previousLegalAddress.country",

    "secondaryOwners.owner.proofOfIdentity.type",
    "secondaryOwners.owner.proofOfIdentity.idNumber",
    "secondaryOwners.owner.proofOfIdentity.issueDate",
    "secondaryOwners.owner.proofOfIdentity.expiryDate",
    "secondaryOwners.owner.proofOfIdentity.issuingCountry",

    "secondaryOwners.owner.countryOfResidence",
    "secondaryOwners.owner.securitiesIndustryAffiliation.typeOfEmployer",
    "secondaryOwners.owner.securitiesIndustryAffiliation.firmNameForEmployee",
    "secondaryOwners.owner.publicCompanyOfficial.firmNameForOfficer",
    "secondaryOwners.owner.publicCompanyOfficial.relationshipOfOfficer",
    "secondaryOwners.owner.publicCompanyOfficial.firmTickerForOfficer",
    "secondaryOwners.owner.foreignOfficial.foreignCountryName",

    "secondaryOwners.trustedContactRelationship",
    "secondaryOwners.includeTrustedContact",
    "secondaryOwners.owner.trustedContact.fullName",
    "secondaryOwners.owner.trustedContact.primaryPhoneNumber",
    "secondaryOwners.owner.trustedContact.primaryEmail",
    "secondaryOwners.owner.trustedContact.mailingAddress.line1",
    "secondaryOwners.owner.trustedContact.mailingAddress.line2",
    "secondaryOwners.owner.trustedContact.mailingAddress.city",
    "secondaryOwners.owner.trustedContact.mailingAddress.postalCode",
    "secondaryOwners.owner.trustedContact.mailingAddress.state",
    "secondaryOwners.owner.trustedContact.mailingAddress.country",
  ];
  set(accDetails, "secondaryOwners", secondaryOwners);
}
// pledgedCollateral
if (modifiedApiResponse.creditCards && isArray(modifiedApiResponse.creditCards)) {
  let pledgedCollateral = [];
  for(let creditCard of modifiedApiResponse.creditCards){
    let pledgedCollateralObj = {
      "outStandingBalance": creditCard.outStandingBalance ? creditCard.outStandingBalance : null,
      "availableCredit": creditCard.availableCredit ? creditCard.availableCredit : null,
      "creditLimit": creditCard.creditLimit ? creditCard.creditLimit : null,
      "subStatusLaHlx3u": creditCard.subStatusLabel ? creditCard.subStatusLabel : null,
      "macroStatusLa3z7ya": creditCard.macroStatusLabel ? creditCard.macroStatusLabel : null,
      "nextPaymentDueDate": creditCard.nextPaymentDueDate ? creditCard.nextPaymentDueDate : null,
      "minimumPaymentDueAmount": creditCard.minimumPaymentDueAmount ? creditCard.minimumPaymentDueAmount : null,
      "statementBalanceAmount": creditCard.statementBalanceAmount ? creditCard.statementBalanceAmount : null,
      "cardNumberLast4Digits": creditCard.cardNumberLast4Digits ? creditCard.cardNumberLast4Digits : null,
      "description": creditCard.description ? creditCard.description : null
    };
    pledgedCollateral = concat(pledgedCollateral, pledgedCollateralObj);
  }
   set(accDetails, "pledgedCollateral", pledgedCollateral);
}
fieldsAssigned = concat(fieldsAssigned, fieldsAssigned4);

return {
  "fields": fieldsAssigned,
  "accDetails": accDetails
};