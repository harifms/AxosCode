let accDetails = response.accDetails;
let fields = response.fields;
let fieldsAssigned = [];

if (apiResponse.coHolders && isArray(apiResponse.coHolders)) {
  let secondaryOwners = [];
 
  for (let secondaryOwner of apiResponse.coHolders) {
    let secOwner = find(accDetails.secondaryOwners, so, so.id == secondaryOwner.externalClientId) || {};
    let owner = secOwner.owner || {};
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
      let employerAddress = owner.employerAddress || {};
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
        if (secondaryOwner.affiliationsGroup.nasdGroup && secondaryOwner.affiliationsGroup.nasdGroup){
          let securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", secondaryOwner.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", secondaryOwner.affiliationsGroup.nasdGroup.nasdEntity);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (secondaryOwner.affiliationsGroup.companyGroup && secondaryOwner.affiliationsGroup.companyGroup){
          let publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompany);
          set(publicCompanyOfficial, "relationshipOfOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", secondaryOwner.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (secondaryOwner.affiliationsGroup.foreignGroup && secondaryOwner.affiliationsGroup.foreignGroup){
          let foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(owner, "foreignOfficial", foreignOfficial);
        }
      }

      if (secondaryOwner.contact.legalAddress) {
        let legalAddress = owner.legalAddress || {};
        set(legalAddress, "line1", secondaryOwner.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", secondaryOwner.contact.legalAddress.streetLine2);
        set(legalAddress, "city", secondaryOwner.contact.legalAddress.city);
        set(legalAddress, "postalCode", secondaryOwner.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == secondaryOwner.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.legalAddress.country]));
        set(owner, "legalAddress", legalAddress);
      }
      
      if (secondaryOwner.contact.mailingAddress) {
        let mailingAddress = owner.mailingAddress || {};
        set(mailingAddress, "line1", secondaryOwner.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", secondaryOwner.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", secondaryOwner.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", secondaryOwner.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == secondaryOwner.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }
      
      if (secondaryOwner.contact.previousAddress) {
        let previousAddress = owner.previousLegalAddress || {};
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
      let proofOfIdentity = owner.proofOfIdentity || {};
      set(proofOfIdentity, "type", secondaryOwner.patriotAct.idType);
      set(proofOfIdentity, "idNumber", secondaryOwner.patriotAct.idNumber);
      set(proofOfIdentity, "issueDate", secondaryOwner.patriotAct.issueDate);
      set(proofOfIdentity, "expiryDate", secondaryOwner.patriotAct.expirationDate);
      set(proofOfIdentity, "issuingCountry", find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.patriotAct.issuedByCountry]));
      set(owner, "proofOfIdentity", proofOfIdentity);
    }
    
    if (secondaryOwner.citizenship && secondaryOwner.citizenship.countryOfResidence) {
      let countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[secondaryOwner.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    
    if (secondaryOwner.trustedContact) {
      let trustedContact = secOwner.trustedContact || {};
    
      set(trustedContact, "fullName", secondaryOwner.trustedContact.name);
      set(trustedContact, "primaryEmail", secondaryOwner.trustedContact.email);
      set(trustedContact, "primaryPhoneNumber", secondaryOwner.trustedContact.phone);
    
      if (!trustedContact.mailingAddress) {
        set(trustedContact, "mailingAddress", {});
      }
      if (secondaryOwner.trustedContact.address){
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
  fieldsAssigned = [
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
    "secondaryOwners.owner.investmentExperienceEquities",
    "secondaryOwners.owner.investmentExperienceEquitiesTransactions",
    "secondaryOwners.owner.investmentExperienceMutualFunds",
    "secondaryOwners.owner.investmentExperienceMutualFundsTransactions",
    "secondaryOwners.owner.investmentExperienceFixedIncome",
    "secondaryOwners.owner.investmentExperienceFixedIncomeTransactions",
    "secondaryOwners.owner.investmentExperienceOptions",
    "secondaryOwners.owner.investmentExperienceOptionsTransactions",
    "secondaryOwners.owner.investExperienceFutures",
    "secondaryOwners.owner.investExperienceFuturesTransactions",
    "secondaryOwners.owner.investmentExperienceAnnuities",
    "secondaryOwners.owner.investmentExperienceAnnuitiesTransactions",
    "secondaryOwners.owner.investExperienceAlternatives",
    "secondaryOwners.owner.investExperienceAlternativesTransactions",
    "secondaryOwners.owner.investExperienceMargin",
    "secondaryOwners.owner.investExperienceMarginTransactions",
    "secondaryOwners.owner.backupWithholdingExemptPayeeCode",
    "secondaryOwners.owner.fatcaReportingExemptionCode",

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
    "secondaryOwners.owner.trustedContact.fullName",
    "secondaryOwners.owner.trustedContact.primaryPhoneNumber",
    "secondaryOwners.owner.trustedContact.primaryEmail",
    "secondaryOwners.owner.trustedContact.mailingAddress.previousLegalAddress.line1",
    "secondaryOwners.owner.trustedContact.mailingAddress.previousLegalAddress.line2",
    "secondaryOwners.owner.trustedContact.mailingAddress.previousLegalAddress.city",
    "secondaryOwners.owner.trustedContact.mailingAddress.previousLegalAddress.postalCode",
    "secondaryOwners.owner.trustedContact.mailingAddress.previousLegalAddress.state",
    "secondaryOwners.owner.trustedContact.mailingAddress.previousLegalAddress.country",
  ];
  set(accDetails, "secondaryOwners", secondaryOwners);
}

fields = isEmpty(fieldsAssigned) ? fields : concat(fields, fieldsAssigned);

return {
  "fields": fields,
  "accDetails": accDetails
};