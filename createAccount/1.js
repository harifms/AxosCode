let Account = account;

set(Account, "primaryOwner.owner.mailingAddress", extendedAccount.primaryOwner.owner.mailingAddress);
set(Account, "primaryOwner.owner.legalAddress", extendedAccount.primaryOwner.owner.legalAddress);
if (!Account.primaryOwner.trustedContactInfoDeclined && extendedAccount.primaryOwner.trustedContact != null) {
  set(Account, "primaryOwner.trustedContact", extendedAccount.primaryOwner.trustedContact);  
  set(Account, "primaryOwner.trustedContact.legalAddress", extendedAccount.primaryOwner.trustedContact.legalAddress);
  set(Account, "primaryOwner.trustedContact.mailingAddress", extendedAccount.primaryOwner.trustedContact.mailingAddress);
}
set(Account, "primaryOwner.owner.previousLegalAddress", extendedAccount.primaryOwner.owner.previousLegalAddress);
set(Account, "primaryOwner.owner.employerAddress", extendedAccount.primaryOwner.owner.employerAddress);
set(Account, "primaryOwner.owner.proofOfIdentity", extendedAccount.primaryOwner.owner.proofOfIdentity);
set(Account, "primaryOwner.owner.regulatoryDisclosuresV0", extendedAccount.primaryOwner.owner.regulatoryDisclosuresV0);

let i = 0;

if (extendedAccount.secondaryOwners){
    i = 0;
    for ( let o of extendedAccount.secondaryOwners ) { 
        set(Account.secondaryOwners[i], "owner.mailingAddress", o.owner.mailingAddress);
        set(Account.secondaryOwners[i], "owner.legalAddress", o.owner.legalAddress);
        if (!o.trustedContactInfoDeclined && o.trustedContact != null) {
          set(Account.secondaryOwners[i], "trustedContact", o.trustedContact);  
          set(Account.secondaryOwners[i], "trustedContact.legalAddress", o.trustedContact.legalAddress);
          set(Account.secondaryOwners[i], "trustedContact.mailingAddress", o.trustedContact.mailingAddress);
        }
        set(Account.secondaryOwners[i], "owner.previousLegalAddress", o.owner.previousLegalAddress);
        set(Account.secondaryOwners[i], "owner.employerAddress", o.owner.employerAddress);
        set(Account.secondaryOwners[i], "owner.proofOfIdentity", o.owner.proofOfIdentity);
        set(Account.secondaryOwners[i], "owner.regulatoryDisclosuresV0", o.owner.regulatoryDisclosuresV0);
        i = i + 1;
    }
}

let accountTypesMap = {
    "COMM-PROP": "JOINT_COMMUNITY_PROPERTY",
    "COMM-PROP-RIGHTS-SURV": "JOINT_COMMUNITY_PROPERTY_WITH_ROS",
    "TENANTS-ENTIRETY": "JOINT_TENANTS_BY_ENTIRETY",
    "TENANTS-COMM": "JOINT_TENANTS_IN_COMMON",
    "IRR-TRUST": "TRUST_IRREVOCABLE",
    "JOINT-TENANTS-RIGHT-SURV": "JOINT_TENANTS_WITH_ROS",
    "INDIVIDUAL": "INDIVIDUAL",
    "INDIVIDUAL-TOD": "INDIVIDUAL",
    "IRA-TRADITIONAL": "IRA_TRADITIONAL",
    "IRA-ROTH": "IRA_ROTH",
    "IRA-SIMPLE": "IRA_SIMPLE",
    "REVOCABLE-TRUST": "TRUST_REVOCABLE",
    "IRA-SEP": "IRA_SEP",
    "IRA-ROLL-OVER": "IRA_ROLLOVER"
};
registrationType = registrationType || Account.registrationType.code;
set(Account, "registrationType", accountTypesMap[registrationType]);

if (Account.primaryOwner.owner.middleName){
	set(Account, "primaryOwner.owner.middleName", skipError(substring(Account.primaryOwner.owner.middleName, 0, 1), Account.primaryOwner.owner.middleName));
}


if (isPresent(Account.secondaryOwners)){
  i = 0;
  for ( let o of Account.secondaryOwners ) {  
      if (isPresent(o.owner)) {
          set(Account.secondaryOwners[i], "owner.middleName", skipError(substring(o.owner.middleName, 0, 1), o.owner.middleName));
      }
      i = i + 1;
  }
}

let genderTypesMap = {
    "Male": "MALE",
    "Female": "FEMALE",
	"No Answer": "NO_ANSWER"
};
set(Account, "primaryOwner.owner.gender", genderTypesMap[Account.primaryOwner.owner.gender] || genderTypesMap["No Answer"]);
if (isPresent(Account.secondaryOwners)){
  i = 0;
  for ( let o of Account.secondaryOwners ) {  
      if (isPresent(o.owner)) {
          set(Account.secondaryOwners[i], "owner.gender", genderTypesMap[o.owner.gender] || genderTypesMap["No Answer"]);
      }
      i = i + 1;
  }
}

let residencyStatusMap = {
    "US Citizen": "RESIDENT",
    "Resident Alien": "RESIDENT_ALIEN",
    "Non-Resident Alien": "NON_RESIDENT_ALIEN"
};
set(Account, "primaryOwner.owner.citizenshipStatus", Account.primaryOwner.owner.citizenshipStatus ? residencyStatusMap[Account.primaryOwner.owner.citizenshipStatus] : residencyStatusMap["US Citizen"]);
set(Account, "primaryOwner.owner.countryOfCitizenship", residencyStatusMap[Account.primaryOwner.owner.citizenshipStatus]);
if(isPresent(Account.secondaryOwners)){   
    i = 0;
    for ( let o of Account.secondaryOwners ) {  
        if (isPresent(o.owner)) {
            set(Account.secondaryOwners[i], "owner.citizenshipStatus" , o.owner.citizenshipStatus ? residencyStatusMap[o.owner.citizenshipStatus] : residencyStatusMap["US Citizen"]);
            set(Account.secondaryOwners[i], "owner.countryOfCitizenship", residencyStatusMap[o.owner.citizenshipStatus]);
        }
        i = i + 1;
    }
}

let maritalStatusMap = {
    "Single": "SINGLE",
    "Married": "MARRIED",
    "Widowed": "WIDOWED",
    "Divorced": "DIVORCED"
};
set(Account, "primaryOwner.owner.maritalStatus", maritalStatusMap[Account.primaryOwner.owner.maritalStatus]);
if(isPresent(Account.secondaryOwners)){  
  i = 0;
  for ( let o of Account.secondaryOwners ) {  
      if (isPresent(o.owner)) {
          set(Account.secondaryOwners[i], "owner.maritalStatus", maritalStatusMap[o.owner.maritalStatus]);
      }
      i = i + 1;
  }
}

return Account;