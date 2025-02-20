let accDetails = response.accDetails;
let fields = response.fields;
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

    set(owner, "investmentExperienceEquities", apiResponse.investmentProfile && apiResponse.investmentProfile.stocksExperience ? maps.experienceMap[apiResponse.investmentProfile.stocksExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceEquitiesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.stocksExperience ? toString(apiResponse.investmentProfile.stocksExperience.transactionsPerYear) : null);
    set(owner, "investmentExperienceMutualFunds", apiResponse.investmentProfile && apiResponse.investmentProfile.mutualFundsExperience ? maps.experienceMap[apiResponse.investmentProfile.mutualFundsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceMutualFundsTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.mutualFundsExperience ? apiResponse.investmentProfile.mutualFundsExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceFixedIncome", apiResponse.investmentProfile && apiResponse.investmentProfile.bondsExperience ? maps.experienceMap[apiResponse.investmentProfile.bondsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceFixedIncomeTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.bondsExperience ? apiResponse.investmentProfile.bondsExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceOptions", apiResponse.investmentProfile && apiResponse.investmentProfile.optionsExperience ? maps.experienceMap[apiResponse.investmentProfile.optionsExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceOptionsTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.optionsExperience ? toString(apiResponse.investmentProfile.optionsExperience.transactionsPerYear) : null);
    set(owner, "investExperienceFutures", apiResponse.investmentProfile && apiResponse.investmentProfile.futuresExperience ? maps.experienceMap[apiResponse.investmentProfile.futuresExperience.assetExperienceRange] : null);
    set(owner, "investExperienceFuturesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.futuresExperience ? apiResponse.investmentProfile.futuresExperience.transactionsPerYear : null);
    set(owner, "investmentExperienceAnnuities", apiResponse.investmentProfile && apiResponse.investmentProfile.annuitiesExperience ? maps.experienceMap[apiResponse.investmentProfile.annuitiesExperience.assetExperienceRange] : null);
    set(owner, "investmentExperienceAnnuitiesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.annuitiesExperience ? apiResponse.investmentProfile.annuitiesExperience.transactionsPerYear : null);
    set(owner, "investExperienceAlternatives", apiResponse.investmentProfile && apiResponse.investmentProfile.alternativeInvestmentsExperience ? maps.experienceMap[apiResponse.investmentProfile.alternativeInvestmentsExperience.assetExperienceRange] : null);
    set(owner, "investExperienceAlternativesTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.alternativeInvestmentsExperience ? apiResponse.investmentProfile.alternativeInvestmentsExperience.transactionsPerYear : null);
    set(owner, "investExperienceMargin", apiResponse.investmentProfile && apiResponse.investmentProfile.marginsExperience ? maps.experienceMap[apiResponse.investmentProfile.marginsExperience.assetExperienceRange] : null);
    set(owner, "investExperienceMarginTransactions", apiResponse.investmentProfile && apiResponse.investmentProfile.marginsExperience ? apiResponse.investmentProfile.marginsExperience.transactionsPerYear : null);
    set(owner, "backupWithholdingExemptPayeeCode", apiResponse.w9 && apiResponse.w9.exemptPayee ? apiResponse.w9.exemptPayee : null);
    set(owner, "fatcaReportingExemptionCode", apiResponse.w9 && apiResponse.w9.factaCode ? apiResponse.w9.factaCode : null);

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
        if (apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup && apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup){
          let securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", apiResponse.individualHolder.contact.affiliationsGroup.nasdGroup.nasdEntity);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (apiResponse.individualHolder.contact.affiliationsGroup.companyGroup && apiResponse.individualHolder.contact.affiliationsGroup.companyGroup){
          let publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", apiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompany);
          set(publicCompanyOfficial, "relationshipOfOfficer", apiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", apiResponse.individualHolder.contact.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (apiResponse.individualHolder.contact.affiliationsGroup.foreignGroup && apiResponse.individualHolder.contact.affiliationsGroup.foreignGroup){
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
    set(accDetails.primaryOwner, "owner", owner);

    let fieldsAssigned = [
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
      "primaryOwner.owner.fatcaReportingExemptionCode",

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

    fields = concat(fields, fieldsAssigned);
  }
}
return {
  "fields": fields,
  "accDetails": accDetails
};