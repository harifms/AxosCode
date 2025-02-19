let accDetails = response.accDetails;
let fields = response.fields;
let fieldsAssigned = [];
if (apiResponse.trustedContact) {
  let trustedContact = accDetails.primaryOwner.trustedContact || {};

  set(trustedContact, "fullName", apiResponse.trustedContact.name);
  set(trustedContact, "primaryEmail", apiResponse.trustedContact.email);
  set(trustedContact, "primaryPhoneNumber", apiResponse.trustedContact.phone);

  if (!trustedContact.mailingAddress) {
    set(trustedContact, "mailingAddress", {});
  }
  set(trustedContact.mailingAddress, "line1", apiResponse.trustedContact.address.streetLine1);
  set(trustedContact.mailingAddress, "line2", apiResponse.trustedContact.address.streetLine2);
  set(trustedContact.mailingAddress, "city", apiResponse.trustedContact.address.city);
  set(trustedContact.mailingAddress, "postalCode", apiResponse.trustedContact.address.postalCode);
  set(trustedContact.mailingAddress, "state", find(stateBO, state, state.code == apiResponse.trustedContact.address.stateOrProvince));
  set(trustedContact.mailingAddress, "country", find(countryBO, country, country.code2Letters == countryMap[apiResponse.trustedContact.address.country]));

  set(accDetails.primaryOwner, "trustedContactRelationship", apiResponse.trustedContact.relationship);
  set(accDetails.primaryOwner, "trustedContact", trustedContact);
  fieldsAssigned = concat(fieldsAssigned, [  
    "primaryOwner.trustedContactRelationship",
    "primaryOwner.owner.trustedContact.fullName",
    "primaryOwner.owner.trustedContact.primaryPhoneNumber",
    "primaryOwner.owner.trustedContact.primaryEmail",
    "primaryOwner.owner.trustedContact.mailingAddress.previousLegalAddress.line1",
    "primaryOwner.owner.trustedContact.mailingAddress.previousLegalAddress.line2",
    "primaryOwner.owner.trustedContact.mailingAddress.previousLegalAddress.city",
    "primaryOwner.owner.trustedContact.mailingAddress.previousLegalAddress.postalCode",
    "primaryOwner.owner.trustedContact.mailingAddress.previousLegalAddress.state",
    "primaryOwner.owner.trustedContact.mailingAddress.previousLegalAddress.country",
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
  let i = 0;
  for (let item of apiResponse.beneficiaries) {
    let relationship = item.relationship ? maps.reversedRelationshipMap[item.relationship] : "Other";
    let benObj = {};
    set(benObj, "perStirpes", item.perStirpes == 'NO' ? false : true);
    set(benObj, "percentage", item.percentage);
    set(benObj, "relationship", item.relationshipDescription == "SPOUSE" ? "Spouse" : "Other");
    set(benObj, "beneficiaryType", item.individualOrEntity == "INDIVIDUAL" ? "Person" : "Entity");
    set(benObj, "rmDOption", relationship || "Other");
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
    let addr = {
      "line1": item.address.streetLine1,
      "line2": item.address.streetLine2,
      "city": item.address.city,
      "postalCode": item.address.postalCode,
      "state": find(stateBO, state, state.code == item.address.stateOrProvince),
      "country": find(countryBO, country, country.code2Letters == countryMap[item.address.country])
    };
    set(person, 'legalAddress', addr);
    set(benObj, 'beneficiary', person);
    beneficiaries = concat(beneficiaries, benObj);
    i = i + 1;
  }
  set(accDetails, "beneficiaries", beneficiaries);
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

fields = isEmpty(fieldsAssigned) ? fields : concat(fields, fieldsAssigned);
return { "fields": fields, "accDetails": accDetails };