let accDetails = response.accDetails;
let fields = response.fields;
let fieldsAssigned = [];
if (apiResponse.trustedContact) {
  let trustedContact = accDetails.primaryOwner.trustedContact;

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
  fieldsAssigned = contact(fieldsAssigned, [  
    "primaryOwner.trustedContactRelationship",
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

fields = isEmpty(fieldsAssigned) ? fields : concat(fields, fieldsAssigned);
return { "fields": fields, "accDetails": accDetails };