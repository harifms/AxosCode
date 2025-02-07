
let accDetails = response.accDetails;
let fields = response.fields;
if (apiResponse.accountType == "TRUST_IRREVOCABLE" || apiResponse.accountType == "TRUST_REVOCABLE") {
  if (isPresent(apiResponse.entityHolder)) {
    let owner = accDetails.primaryOwner.owner;

    set(owner, "fullName", apiResponse.entityHolder.entityName);
    set(owner, "dateOfBirth", apiResponse.entityHolder.entityFormationDate);
    set(owner, "citizenshipStatus", apiResponse.entityHolder.citizenship && apiResponse.entityHolder.citizenship.citizenshipStatus ? maps.residencyStatusMap[apiResponse.entityHolder.citizenship.citizenshipStatus] : "");
    set(owner, "ein", apiResponse.entityHolder.itin);

    if (apiResponse.entityHolder.contact) {
      set(owner, "businessPhoneNumber", apiResponse.entityHolder.contact.phone);

      if (apiResponse.entityHolder.contact.legalAddress) {
        let legalAddress = owner.legalAddress;

        set(legalAddress, "line1", apiResponse.entityHolder.contact.legalAddress.streetLine1);
        set(legalAddress, "line2", apiResponse.entityHolder.contact.legalAddress.streetLine2);
        set(legalAddress, "city", apiResponse.entityHolder.contact.legalAddress.city);
        set(legalAddress, "postalCode", apiResponse.entityHolder.contact.legalAddress.postalCode);
        set(legalAddress, "state", find(stateBO, state, state.code == apiResponse.entityHolder.contact.legalAddress.stateOrProvince));
        set(legalAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.legalAddress.country]));

        set(owner, "legalAddress", legalAddress);
      }
      if (apiResponse.entityHolder.contact.mailingAddress) {
        let mailingAddress = owner.mailingAddress;
        set(mailingAddress, "line1", apiResponse.entityHolder.contact.mailingAddress.streetLine1);
        set(mailingAddress, "line2", apiResponse.entityHolder.contact.mailingAddress.streetLine2);
        set(mailingAddress, "city", apiResponse.entityHolder.contact.mailingAddress.city);
        set(mailingAddress, "postalCode", apiResponse.entityHolder.contact.mailingAddress.postalCode);
        set(mailingAddress, "state", find(stateBO, state, state.code == apiResponse.entityHolder.contact.mailingAddress.stateOrProvince));
        set(mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.mailingAddress.country]));
        set(owner, "mailingAddress", mailingAddress);
      }
      if (apiResponse.entityHolder.contact.previousAddress) {
        let previousAddress = owner.previousLegalAddress;

        set(previousAddress, "line1", apiResponse.entityHolder.contact.previousAddress.streetLine1);
        set(previousAddress, "line2", apiResponse.entityHolder.contact.previousAddress.streetLine2);
        set(previousAddress, "city", apiResponse.entityHolder.contact.previousAddress.city);
        set(previousAddress, "postalCode", apiResponse.entityHolder.contact.previousAddress.postalCode);
        set(previousAddress, "state", find(stateBO, state, state.code == apiResponse.entityHolder.contact.previousAddress.stateOrProvince));
        set(previousAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.previousAddress.country]));

        set(owner, "previousLegalAddress", previousAddress);
      }
      if (apiResponse.entityHolder.contact.affiliationsGroup) {
        if (apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup && apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup) {
          let securitiesIndustryAffiliation = owner.securitiesIndustryAffiliation || {};
          set(securitiesIndustryAffiliation, "typeOfEmployer", apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasdType);
          set(securitiesIndustryAffiliation, "firmNameForEmployee", apiResponse.entityHolder.contact.affiliationsGroup.nasdGroup.nasdEntity);
          set(owner, "securitiesIndustryAffiliation", securitiesIndustryAffiliation);
        }
        if (apiResponse.entityHolder.contact.affiliationsGroup.companyGroup && apiResponse.entityHolder.contact.affiliationsGroup.companyGroup) {
          let publicCompanyOfficial = owner.publicCompanyOfficial || {};
          set(publicCompanyOfficial, "firmNameForOfficer", apiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompany);
          set(publicCompanyOfficial, "relationshipOfOfficer", apiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyType);
          set(publicCompanyOfficial, "firmTickerForOfficer", apiResponse.entityHolder.contact.affiliationsGroup.companyGroup.publicCompanyNameOrSymbol);
          set(owner, "publicCompanyOfficial", publicCompanyOfficial);
        }
        if (apiResponse.entityHolder.contact.affiliationsGroup.foreignGroup && apiResponse.entityHolder.contact.affiliationsGroup.foreignGroup) {
          let foreignOfficial = owner.foreignOfficial || {};
          set(foreignOfficial, "foreignOfficialCountry", find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.contact.affiliationsGroup.foreignGroup.foreignOfficialCountry]));
          set(owner, "foreignOfficial", foreignOfficial);
        }
      }
    }

    if (apiResponse.entityHolder.citizenship && apiResponse.entityHolder.citizenship.countryOfResidence) {
      let countryOfResidence = find(countryBO, country, country.code2Letters == countryMap[apiResponse.entityHolder.citizenship.countryOfResidence]);
      set(owner, "countryOfResidence", countryOfResidence);
    }
    set(accDetails.primaryOwner, "owner", owner);
    let fieldsAssigned = [
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
    fields = concat(fields, fieldsAssigned);
  }
}
return {
  "fields": fields,
  "accDetails": accDetails
};