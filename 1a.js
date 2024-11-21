let i = 0;

let proofOfIdentityMap = {
    "Driver's License": "DRIVERS_LICENSE",
    "Passport": "PASSPORT",
    "State ID": "STATE_ID",
    "Foreign Tax ID": "FOREIGN_TAX_ID",
    "Other Government ID": "OTHER_GOVERNMENT_ID",
    "Other": "OTHER_GOVERNMENT_ID"
};
if (Account.primaryOwner.owner.proofOfIdentity != null){
   set(Account, "primaryOwner.owner.proofOfIdentity.type", proofOfIdentityMap[Account.primaryOwner.owner.proofOfIdentity.type]);
}
if(isPresent(Account.secondaryOwners)){  
    i = 0;
    for ( let o of Account.secondaryOwners ) {  
        if (isPresent(o.owner) && isPresent(o.owner.proofOfIdentity)) {
            set(Account.secondaryOwners[i], "owner.proofOfIdentity.type", proofOfIdentityMap[o.owner.proofOfIdentity.type]);
        }
        i = i + 1;
    }
}


let employmentStatusMap = {
    "Employed": "EMPLOYED",
    "Self Employed": "SELF_EMPLOYED",
    "Retired": "RETIRED",
    "Not Employed": "UNEMPLOYED",
    "Homemaker": "HOME_MAKER",
    "Student": "STUDENT"
};
set(Account, "primaryOwner.owner.employmentStatus", employmentStatusMap[Account.primaryOwner.owner.employmentStatus]);
if(isPresent(Account.secondaryOwners)){  
  i = 0;
  for ( let o of Account.secondaryOwners ) {
      if (isPresent(o.owner) && o.owner.employmentStatus) {
          set(Account.secondaryOwners[i], "owner.employmentStatus", employmentStatusMap[o.owner.employmentStatus]);
      }  
      i = i + 1;
  }
}

let ownershipStatusMap = {
    "Own": "OWN",
    "Rent": "RENT"
};
set(Account, "primaryOwner.owner.homeOwnership", ownershipStatusMap[Account.primaryOwner.owner.homeOwnership]);
if(isPresent(Account.secondaryOwners)){  
  i = 0;
  for ( let o of Account.secondaryOwners ) {
      if (isPresent(o.owner)) {
          set(Account.secondaryOwners[i], "owner.homeOwnership", ownershipStatusMap[o.owner.homeOwnership]);
      }
      i = i + 1;
  }
}

// This has to confirm
let yesNoMap = {
    "Yes": "YES",
    "No": "NO"
};
if (Account.primaryOwner.owner.regulatoryDisclosuresV0 != null){
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity", yesNoMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity] || yesNoMap["No"]);
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany",  yesNoMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany] || yesNoMap["No"]);
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial",  yesNoMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial] || yesNoMap["No"]);
}
if(isPresent(Account.secondaryOwners)){  
  i = 0;
  for ( let o of Account.secondaryOwners ) {
      if (isPresent(o.owner) && o.owner.regulatoryDisclosuresV0) {
          set(Account.secondaryOwners[i], "owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity", yesNoMap[o.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity] || yesNoMap["No"]);
          set(Account.secondaryOwners[i], "owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany",  yesNoMap[o.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany] || yesNoMap["No"]);
          set(Account.secondaryOwners[i], "owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial",  yesNoMap[o.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial] || yesNoMap["No"]);
      }  
      i = i + 1;
  }
}

let brokerRegulatoryMap = {
    "Broker-Dealer or Municipal Securities Dealer": "DEALER",
    "Investment Advisor": "ADVISOR",
    "FINRA or other Self-Regulatory Organization": "SRO",
    "State or Federal Securities Regulator": "REGULATOR"
};
if (Account.primaryOwner.owner.regulatoryDisclosuresV0 != null){
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer", brokerRegulatoryMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer]);
}
if(isPresent(Account.secondaryOwners)){  
  i = 0;
  for ( let o of Account.secondaryOwners ) {
      if (isPresent(o.owner) && isPresent(o.owner.regulatoryDisclosuresV0)) {
          set(Account.secondaryOwners[i], "owner.regulatoryDisclosuresV0.typeOfEmployer", brokerRegulatoryMap[o.owner.regulatoryDisclosuresV0.typeOfEmployer]);
      }
      i = i + 1;
  }
}

let corporateRolesMap = {
    "10% shareholder": "SHAREHOLDER",
    "CEO": "CEO",
    "CFO": "CFO",
    "COO": "COO",
    "Other Officer": "OTHER"
};
if (Account.primaryOwner.owner.regulatoryDisclosuresV0 != null){
  set(Account, "primaryOwner.owner.regulatoryDisclosuresV0.officerRole", corporateRolesMap[Account.primaryOwner.owner.regulatoryDisclosuresV0.officerRole]);
}
if(isPresent(Account.secondaryOwners)){  
  i = 0;
  for ( let o of Account.secondaryOwners ) {
      if (isPresent(o.owner) && isPresent(o.owner.regulatoryDisclosuresV0)) {
          set(Account.secondaryOwners[i], "owner.regulatoryDisclosuresV0.officerRole", corporateRolesMap[o.owner.regulatoryDisclosuresV0.officerRole]);
      }
      i = i + 1;
  }
}
return Account;