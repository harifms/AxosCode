// mapping logic 1

set(accDetails, "name", apiResponse.accountName);
set(accDetails, "nickName", apiResponse.principalName);
set(accDetails, "accountCustodianStatus", apiResponse.status);
set(accDetails, "startDate", parseDate(apiResponse.openedDate, "yyyy-MM-dd"));
set(accDetails, "repCodeLink", isEmpty(repCodeBo) ? accDetails.repCodeLink : repCodeBo[0]);
set(accDetails, "ouLevel1", isEmpty(orgUnitBo) ? accDetails.ouLevel1 : orgUnitBo[0]);

let tradingPrivileges = [];

if (apiResponse.enableMargin) {
  if(apiResponse.enableMargin == 'YES'){
    tradingPrivileges = concat(tradingPrivileges, 'Margin');
  }  
  set(accDetails, "enableMargin", apiResponse.enableMargin);
}
if (apiResponse.enableOptions) {
  if(apiResponse.enableOptions == 'YES'){
    tradingPrivileges = concat(tradingPrivileges, 'Options');
  }  
  set(accDetails, "enableOptions", apiResponse.enableOptions);
}
if(apiResponse.optionsLevel){
    set(accDetails, "optionsLevel", apiResponse.optionsLevel);
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
set(accDetails, "advisorTradingDiscretion", apiResponse.discretion);

if(apiResponse.investmentProfile){
  if (apiResponse.investmentProfile.annualIncomeOther) {
    set(accDetails, "annualIncomeExact", apiResponse.investmentProfile.annualIncomeOther);
  }

  if (apiResponse.investmentProfile.netWorthOther) {
    set(accDetails, "netWorthExcludingHomeExact", apiResponse.investmentProfile.netWorthOther);
  }

  if (apiResponse.investmentProfile.liquidNetWorthOther) {
    set(accDetails, "liquidAssetsExact", apiResponse.investmentProfile.liquidNetWorthOther);
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

if (apiResponse.accountType != "TRUST_IRREVOCABLE" && apiResponse.accountType != "TRUST_REVOCABLE") {
  if (isPresent(apiResponse.individualHolder)) {
    let ssNOrTaxID = null;
    if (isPresent(apiResponse.individualHolder.ssn)) {
      ssNOrTaxID = replace(apiResponse.individualHolder.ssn, '-', '');
    }
    if (!accDetails.primaryOwner) {
      set(accDetails, "primaryOwner", {});
    }
    let owner = accDetails.primaryOwner.owner || {};

    set(owner, "firstName", apiResponse.individualHolder.name && apiResponse.individualHolder.name.givenName ? apiResponse.individualHolder.name.givenName : null);
    set(owner, "middleName", apiResponse.individualHolder.name && apiResponse.individualHolder.name.middleInitial ? apiResponse.individualHolder.name.middleInitial : null);
    set(owner, "lastName", apiResponse.individualHolder.name && apiResponse.individualHolder.name.familyName ? apiResponse.individualHolder.name.familyName : null);
    set(owner, "dateOfBirth", apiResponse.individualHolder.birthDate ? apiResponse.individualHolder.birthDate : null);
    set(owner, "gender", apiResponse.individualHolder.gender ? maps.genderTypeMap[apiResponse.individualHolder.gender] : null);
    set(owner, "citizenshipStatus", apiResponse.individualHolder.citizenship && apiResponse.individualHolder.citizenship.citizenshipStatus ? maps.residencyStatusMap[apiResponse.individualHolder.citizenship.citizenshipStatus] : null);
    set(owner, "ssNOrTaxID", ssNOrTaxID ? substring(ssNOrTaxID, 0, 3) + '-' + substring(ssNOrTaxID, 3, 5) + '-' + substring(ssNOrTaxID, 5, 9) : null);
    set(owner, "numberOfDependents", apiResponse.individualHolder.numDependents ? apiResponse.individualHolder.numDependents : 0);
    set(owner, "maritalStatus", apiResponse.individualHolder.maritalStatus ? maps.maritalStatusMap[apiResponse.individualHolder.maritalStatus] : null);
    set(owner, "employmentStatus", apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.employmentStatus ? maps.employmentStatusMap[apiResponse.individualHolder.employment.employmentStatus] : null);
    set(owner, "occupation", apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.occupation ? apiResponse.individualHolder.employment.occupation : null);
    set(owner, "natureOfBusiness", apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.natureOfBusiness ? apiResponse.individualHolder.employment.natureOfBusiness : null);
    set(owner, "employer", apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.employer ? apiResponse.individualHolder.employment.employer : null);
    set(owner, "yearsEmployed", apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.yearsEmployed ? apiResponse.individualHolder.employment.yearsEmployed : 0);
    set(owner, "employerPhoneNumber", apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.workPhone ? apiResponse.individualHolder.employment.workPhone : null);
    set(owner, "homeOwnership", apiResponse.individualHolder.homeType ? maps.ownershipStatusMap[apiResponse.individualHolder.homeType] : null);
    set(owner, "primaryEmail", apiResponse.individualHolder.email ? apiResponse.individualHolder.email : null);
    set(owner, "primaryPhoneNumber", apiResponse.individualHolder.contact && apiResponse.individualHolder.contact.phone ? apiResponse.individualHolder.contact.phone : null);

    set(owner, "investmentExperienceEquities", apiResponse.investmentProfile && apiResponse.investmentProfile.stocksExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.stocksExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceEquitiesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.stocksExperience ? toString(apiResponse.investmentProfile.stocksExperience.transactionsPerYear) : null);
    set(owner, "investmentExperienceMutualFunds", apiResponse.investmentProfile && apiResponse.investmentProfile.mutualFundsExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.mutualFundsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceMutualFundsTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.mutualFundsExperience ? apiResponse.investmentProfile.mutualFundsExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceFixedIncome", apiResponse.investmentProfile && apiResponse.investmentProfile.bondsExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.bondsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceFixedIncomeTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.bondsExperience ? apiResponse.investmentProfile.bondsExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceOptions", apiResponse.investmentProfile && apiResponse.investmentProfile.optionsExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.optionsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceOptionsTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.optionsExperience ? toString(apiResponse.investmentProfile.optionsExperience.transactionsPerYear) : null);
    set(owner, "investExperienceFutures", apiResponse.investmentProfile && apiResponse.investmentProfile.futuresExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.futuresExperience.assetExperienceRange] : null);
    set(owner, "investExperienceFuturesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.futuresExperience ? apiResponse.investmentProfile.futuresExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceAnnuities", apiResponse.investmentProfile && apiResponse.investmentProfile.annuitiesExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.annuitiesExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceAnnuitiesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.annuitiesExperience ? apiResponse.investmentProfile.annuitiesExperience.transactionsPerYear : null);
    set(owner, "investExperienceAlternatives", apiResponse.investmentProfile && apiResponse.investmentProfile.alternativeInvestmentsExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.alternativeInvestmentsExperience.assetExperienceRange] : null);
    set(owner, "investExperienceAlternativesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.alternativeInvestmentsExperience ? apiResponse.investmentProfile.alternativeInvestmentsExperience.transactionsPerYear : null);
    set(owner, "investExperienceMargin", apiResponse.investmentProfile && apiResponse.investmentProfile.marginsExperience ? maps.assetExperienceRangeMap[apiResponse.investmentProfile.marginsExperience.assetExperienceRange] : null);
    set(owner, "investExperienceMarginTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.marginsExperience ? apiResponse.investmentProfile.marginsExperience.transactionsPerYear : null);
    set(owner, "backupWithholdingExemptPayeeCode", apiResponse.w9 && apiResponse.w9.exemptPayee ? apiResponse.w9.exemptPayee : null);
    set(owner, "faTCAReportingExemptionCode", apiResponse.w9 && apiResponse.w9.factaCode ? apiResponse.w9.factaCode : null);

    if (apiResponse.individualHolder.employment && apiResponse.individualHolder.employment.workAddress) {
      let workAddress = apiResponse.individualHolder.employment.workAddress;
      let employerAddress = owner.employerAddress || {};

      set(employerAddress, "line1", workAddress.streetLine1);
      set(employerAddress, "line2", workAddress.streetLine2);
      set(employerAddress, "city", workAddress.city);
      set(employerAddress, "postalCode", workAddress.postalCode);
      set(employerAddress, "state", find(stateBO, state, state.code == workAddress.stateOrProvince));
      set(employerAddress, "country", find(countryBO, country, country.code2Letters == countryMap[workAddress.country]));

      set(owner, "employerAddress", employerAddress);
    }

    if (apiResponse.individualHolder.contact) {
      if (apiResponse.individualHolder.contact.legalAddress) {
        let legalAddress = owner.legalAddress || {};

        set(legalAddress, "line1", apiResponse.individualHolder.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", apiResponse.individualHolder.contact.legalAddress.streetLine2);
        set(legalAddress, "city", apiResponse.individualHolder.contact.legalAddress.city);
        set(legalAddress, "postalCode", apiResponse.individualHolder.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == apiResponse.individualHolder.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.legalAddress.country]));

        set(owner, "legalAddress", legalAddress);
      }
      if (apiResponse.individualHolder.contact.mailingAddress) {
        let mailingAddress = owner.mailingAddress || {};
        set(mailingAddress, "line1", apiResponse.individualHolder.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", apiResponse.individualHolder.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", apiResponse.individualHolder.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", apiResponse.individualHolder.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == apiResponse.individualHolder.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }
      if (apiResponse.individualHolder.contact.previousAddress) {
        let previousAddress = owner.previousLegalAddress || {};

        set(previousAddress, "line1", apiResponse.individualHolder.contact.previousAddress.streetLine1);
        set(previousAddress, "line2", apiResponse.individualHolder.contact.previousAddress.streetLine2);
        set(previousAddress, "city", apiResponse.individualHolder.contact.previousAddress.city);
        set(previousAddress, "postalCode", apiResponse.individualHolder.contact.previousAddress.postalCode);
        set(previousAddress, "state", find(stateBO, state, state.code == apiResponse.individualHolder.contact.previousAddress.stateOrProvince));
        set(previousAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.previousAddress.country]));

        set(owner, "previousLegalAddress", previousAddress);
      }
      if (apiResponse.individualHolder.contact.affiliationsGroup) {
        if (apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup) {
          let securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasdEntity);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (apiResponse.individualHolder.contact.affiliationsGroup.companyGroup) {
          let publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", apiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompany);
          set(publicCompanyOfficial, "relationshipOfOfficer", apiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", apiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (apiResponse.individualHolder.contact.affiliationsGroup.foreignGroup) {
          let foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.contact.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(owner, "foreignOfficial", foreignOfficial);
        }
      }
    }

    if (apiResponse.individualHolder.patriotAct) {
      let proofOfIdentity = owner.proofOfIdentity || {};

      set(proofOfIdentity, "type", apiResponse.individualHolder.patriotAct.idType);
      set(proofOfIdentity, "idNumber", apiResponse.individualHolder.patriotAct.idNumber);
      set(proofOfIdentity, "issueDate", apiResponse.individualHolder.patriotAct.issueDate);
      set(proofOfIdentity, "expiryDate", apiResponse.individualHolder.patriotAct.expirationDate);
      set(proofOfIdentity, "issuingCountry", find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.patriotAct.issuedByCountry]));

      set(owner, "proofOfIdentity", proofOfIdentity);
    }
    if (apiResponse.individualHolder.citizenship && apiResponse.individualHolder.citizenship.countryOfResidence) {
      let countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[apiResponse.individualHolder.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    if (apiResponse.individualHolder.citizenship && apiResponse.individualHolder.citizenship.taxJurisdiction) {
      let taxJurisdiction = find(countryBO, country, country.code2Letters == apiResponse.individualHolder.citizenship.taxJurisdiction);
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

if (apiResponse.trustedContact) {
  let trustedContact = accDetails.primaryOwner && accDetails.primaryOwner.trustedContact ? accDetails.primaryOwner.trustedContact : {};
  set(accDetails.primaryOwner, "includeTrustedContact", true);

  set(trustedContact, "fullName", apiResponse.trustedContact.name);
  set(trustedContact, "primaryEmail", apiResponse.trustedContact.email);
  set(trustedContact, "primaryPhoneNumber", apiResponse.trustedContact.phone);

  if (apiResponse.trustedContact.address){
    if (!trustedContact.mailingAddress) {
        set(trustedContact, "mailingAddress", {});
    }
    set(trustedContact.mailingAddress, "line1", apiResponse.trustedContact.address.streetLine1);
    set(trustedContact.mailingAddress, "line2", apiResponse.trustedContact.address.streetLine2);
    set(trustedContact.mailingAddress, "city", apiResponse.trustedContact.address.city);
    set(trustedContact.mailingAddress, "postalCode", apiResponse.trustedContact.address.postalCode);
    set(trustedContact.mailingAddress, "state", find(stateBO, state, state.code == apiResponse.trustedContact.address.stateOrProvince));
    set(trustedContact.mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.trustedContact.address.country]));
  }

  set(accDetails.primaryOwner, "trustedContactRelationship", apiResponse.trustedContact.relationship);
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
if (apiResponse.jointAccount && apiResponse.jointAccount.jointTenantMarried) {
  set(accDetails.primaryOwner, "spouseIsAJointOwner", apiResponse.jointAccount.jointTenantMarried == 'YES' ? true : false);
  fieldsAssigned = concat(fieldsAssigned, [
    "primaryOwner.spouseIsAJointOwner"
  ]);
}

if (apiResponse.beneficiaries && isArray(apiResponse.beneficiaries)) {
  let beneficiaries = [];
  let contingentBeneficiaries = [];
  let i = 0;
  for (let item of apiResponse.beneficiaries) {
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

if (apiResponse.accountType == "TRUST_IRREVOCABLE" || apiResponse.accountType == "TRUST_REVOCABLE") {
  if (isPresent(apiResponse.entityHolder)) {
    owner = accDetails.primaryOwner.owner;
    set(owner, "fullName", apiResponse.entityHolder.entityName);
    set(owner, "dateOfBirth", apiResponse.entityHolder.entityFormationDate);
    set(owner, "citizenshipStatus", apiResponse.entityHolder.citizenship && apiResponse.entityHolder.citizenship.citizenshipStatus ? maps.residencyStatusMap[apiResponse.entityHolder.citizenship.citizenshipStatus] : "");
    set(owner, "ein", apiResponse.entityHolder.itin);
    if (apiResponse.entityHolder.contact) {
      set(owner, "businessPhoneNumber", apiResponse.entityHolder.contact.phone);

      if (apiResponse.entityHolder.contact.legalAddress) {
        legalAddress = owner.legalAddress || {};

        set(legalAddress, "line1", apiResponse.entityHolder.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", apiResponse.entityHolder.contact.legalAddress.streetLine2);
        set(legalAddress, "city", apiResponse.entityHolder.contact.legalAddress.city);
        set(legalAddress, "postalCode", apiResponse.entityHolder.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == apiResponse.entityHolder.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.legalAddress.country]));

        set(owner, "legalAddress", legalAddress);
      }
      if (apiResponse.entityHolder.contact.mailingAddress) {
        mailingAddress = owner.mailingAddress || {};
        set(mailingAddress, "line1", apiResponse.entityHolder.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", apiResponse.entityHolder.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", apiResponse.entityHolder.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", apiResponse.entityHolder.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == apiResponse.entityHolder.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }
      if (apiResponse.entityHolder.contact.previousAddress) {
        previousAddress = owner.previousLegalAddress || {};

        set(previousAddress, "line1", apiResponse.entityHolder.contact.previousAddress.streetLine1);
        set(previousAddress, "line2", apiResponse.entityHolder.contact.previousAddress.streetLine2);
        set(previousAddress, "city", apiResponse.entityHolder.contact.previousAddress.city);
        set(previousAddress, "postalCode", apiResponse.entityHolder.contact.previousAddress.postalCode);
        set(previousAddress, "state", find(stateBO, state, state.code == apiResponse.entityHolder.contact.previousAddress.stateOrProvince));
        set(previousAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.previousAddress.country]));

        set(owner, "previousLegalAddress", previousAddress);
      }
      if (apiResponse.entityHolder.contact.affiliationsGroup) {
        if (apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup) {
          securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasdEntity);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (apiResponse.entityHolder.contact.affiliationsGroup.companyGroup) {
          publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", apiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompany);
          set(publicCompanyOfficial, "relationshipOfOfficer", apiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", apiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (apiResponse.entityHolder.contact.affiliationsGroup.foreignGroup) {
          foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(owner, "foreignOfficial", foreignOfficial);
        }

      }
    }
    if (apiResponse.entityHolder.citizenship && apiResponse.entityHolder.citizenship.countryOfResidence) {
      countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    if (apiResponse.entityHolder.citizenship && apiResponse.entityHolder.citizenship.taxJurisdiction) {
      taxJurisdiction = find(countryBO, country, country.code2Letters == apiResponse.entityHolder.citizenship.taxJurisdiction);
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

if (apiResponse.coHolders && isArray(apiResponse.coHolders)) {
  let secondaryOwners = [];

  for (let secondaryOwner of apiResponse.coHolders) {
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
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (secondaryOwner.affiliationsGroup.companyGroup) {
          publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompany);
          set(publicCompanyOfficial, "relationshipOfOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (secondaryOwner.affiliationsGroup.foreignGroup) {
          foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
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
fieldsAssigned = concat(fieldsAssigned, fieldsAssigned4);

return {
  "fields": fieldsAssigned,
  "accDetails": accDetails
};