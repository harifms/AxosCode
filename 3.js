if (Account.registrationType != "TRUST_IRREVOCABLE" && Account.registrationType != "TRUST_REVOCABLE"){
    set(payload.requests[0], "individualHolder", {
         "name": {
             "givenName": Account.primaryOwner.owner.firstName,
             "middleInitial": Account.primaryOwner.owner.middleName,
             "familyName": Account.primaryOwner.owner.lastName
         },
         "birthDate": Account.primaryOwner.owner.dateOfBirth,
         "gender": Account.primaryOwner.owner.gender,
         "citizenship": {
             "citizenshipStatus": Account.primaryOwner.owner.citizenshipStatus ? Account.primaryOwner.owner.citizenshipStatus : countries["US"],
             "taxJurisdiction": Account.primaryOwner.owner.citizenshipStatus == "RESIDENT" ? "US" : "OTHER",
             "countryOfResidence": Account.primaryOwner.owner.citizenshipStatus == "RESIDENT" || !Account.primaryOwner.owner.citizenshipStatus || !Account.primaryOwner.owner.countryOfResidence ? countries["US"] : countries[Account.primaryOwner.owner.countryOfResidence.code2Letters]
         },
         "ssn": Account.primaryOwner.owner.ssNOrTaxID,
         "numDependents": Account.primaryOwner.owner.numberOfDependents,
         "maritalStatus": Account.primaryOwner.owner.maritalStatus,
         "employment": {
             "employmentStatus": Account.primaryOwner.owner.employmentStatus,
             "occupation": Account.primaryOwner.owner.occupation, // ?? (Account.primaryOwner.owner.employmentStatus == "RETIRED" || Account.primaryOwner.owner.employmentStatus == "UNEMPLOYED") ? Account.primaryOwner.owner. : Account.primaryOwner.owner.occupation,
             "natureOfBusiness": Account.primaryOwner.owner.natureOfBusiness,
             "employer": Account.primaryOwner.owner.employer,
             "yearsEmployed": Account.primaryOwner.owner.yearsEmployed || 0,
             "workPhone": replace(Account.primaryOwner.owner.employerPhoneNumber, " ", "")
         },
         "homeType": Account.primaryOwner.owner.homeOwnership,
         "email": Account.primaryOwner.owner.primaryEmail,
         "contact": {
             "phone": replace(Account.primaryOwner.owner.primaryPhoneNumber, " ", "")
         },
 
         "externalClientId": requestId
     });                
     if (Account.primaryOwner.owner.regulatoryDisclosuresV0){
         set(payload.requests[0].individualHolder.contact, "affiliationsGroup", {
             "nasdGroup": {
                 "nasd": Account.primaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity,
                 "nasdType": Account.primaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer,
                 "nasdEntity": Account.primaryOwner.owner.regulatoryDisclosuresV0.firmNameForEmployee
             },
             "companyGroup": {
                 "publicCompany": Account.primaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany,
                 "publicCompanyType": Account.primaryOwner.owner.regulatoryDisclosuresV0.officerRole,
                 "publicCompanyNameOrSymbol": Account.primaryOwner.owner.regulatoryDisclosuresV0.firmNameForOfficer || Account.primaryOwner.owner.regulatoryDisclosuresV0.firmTickerForOfficer
             },
             "foreignGroup": {
                 "foreignOfficial": Account.primaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial,
                 "foreignOfficialCountry": countries[Account.primaryOwner.owner.regulatoryDisclosuresV0.foreignCountryName] || "USA"
             }
         });
     }
 
     if (Account.primaryOwner.owner.proofOfIdentity){
         set(payload.requests[0].individualHolder, "patriotAct", {
             "idType": Account.primaryOwner.owner.proofOfIdentity.type,
             "idNumber": Account.primaryOwner.owner.proofOfIdentity.idNumber,
             "issuedByCountry": Account.primaryOwner.owner.proofOfIdentity.issuingCountry,
             "issuedByState": Account.primaryOwner.owner.proofOfIdentity.issuingState,
             "issueDate": Account.primaryOwner.owner.proofOfIdentity.issueDate,
             "expirationDate": Account.primaryOwner.owner.proofOfIdentity.expiryDate
         });
     }
     if (Account.primaryOwner.owner.employerAddress){
         set(payload.requests[0].individualHolder.employment, "workAddress", {
             "streetLine1": Account.primaryOwner.owner.employerAddress.line1,
             "streetLine2": Account.primaryOwner.owner.employerAddress.line2,
             "city": Account.primaryOwner.owner.employerAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.employerAddress.state,
             "postalCode": Account.primaryOwner.owner.employerAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.employerAddress.country ? Account.primaryOwner.owner.employerAddress.country.code2Letters : "US"] || "USA"
         });
     }
     if (Account.primaryOwner.owner.legalAddress){
         set(payload.requests[0].individualHolder.contact, "legalAddress", {
             "streetLine1": Account.primaryOwner.owner.legalAddress.line1,
             "streetLine2": Account.primaryOwner.owner.legalAddress.line2,
             "city": Account.primaryOwner.owner.legalAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.legalAddress.state,
             "postalCode": Account.primaryOwner.owner.legalAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.legalAddress.country ? Account.primaryOwner.owner.legalAddress.country.code2Letters : "US"] || "USA"
         });
     }
     if (Account.primaryOwner.owner.mailingAddress){
         set(payload.requests[0].individualHolder.contact, "mailingAddress", {
             "streetLine1": Account.primaryOwner.owner.mailingAddress.line1,
             "streetLine2": Account.primaryOwner.owner.mailingAddress.line2,
             "city": Account.primaryOwner.owner.mailingAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.mailingAddress.state,
             "postalCode": Account.primaryOwner.owner.mailingAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.mailingAddress.country ? Account.primaryOwner.owner.mailingAddress.country.code2Letters : "US"] || "USA"
         });
     }
     if (Account.primaryOwner.owner.previousLegalAddress){
         set(payload.requests[0].individualHolder.contact, "previousAddress", {
             "streetLine1": Account.primaryOwner.owner.previousLegalAddress.line1,
             "streetLine2": Account.primaryOwner.owner.previousLegalAddress.line2,
             "city": Account.primaryOwner.owner.previousLegalAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.previousLegalAddress.state,
             "postalCode": Account.primaryOwner.owner.previousLegalAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.previousLegalAddress.country ? Account.primaryOwner.owner.previousLegalAddress.country.code2Letters : "US"] || "USA"
         });
     }
 
     if (includes(Account.tradingPrivileges, "Margins", 0)){
       set(payload.requests[0].individualHolder, "marginsAgreement", {
         // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020", ?? 
         "documentRevision": "Margin Agreement|CO02|03.2019",
         "holderESignature": "YES"
       });
     }
     if (includes(Account.tradingPrivileges, "Options", 0)){
       set(payload.requests[0].individualHolder, "optionsAgreement", {
         // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
         "documentRevision": "Option Agreement|CO04|03.2019",
         "holderESignature": "YES"
       });
     }
     set(payload.requests[0].individualHolder, "accountAgreement", {
         "documentRevision": "Account Application|CO01|03.2019 (002)", // ?? Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", // Not in docs
         "holderESignature": "YES"
     });
 } else {
     set(payload.requests[0], "entityHolder", {
         "entityName":Account.primaryOwner.owner.fullName,
         "entityFormationDate":Account.primaryOwner.owner.dateOfBirth,
         "citizenship": {
             "citizenshipStatus": Account.primaryOwner.owner.citizenshipStatus ? Account.primaryOwner.owner.citizenshipStatus : countries["US"],
             "taxJurisdiction": Account.primaryOwner.owner.citizenshipStatus == "RESIDENT" ? "US" : "OTHER",
             "countryOfResidence": Account.primaryOwner.owner.citizenshipStatus == "RESIDENT" || !Account.primaryOwner.owner.citizenshipStatus || !Account.primaryOwner.owner.countryOfResidence ? countries["US"] : countries[Account.primaryOwner.owner.countryOfResidence.code2Letters]
         },
         "itin": Account.primaryOwner.owner.ssnOrTaxId
     });
     set(payload.requests[0].entityHolder, "contact", {
         "phone": replace(Account.primaryOwner.owner.businessPhoneNumber, " ", ""),
         "legalAddress": {
             "streetLine1": Account.primaryOwner.owner.legalAddress.line1,
             "streetLine2": Account.primaryOwner.owner.legalAddress.line2,
             "city": Account.primaryOwner.owner.legalAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.legalAddress.state,
             "postalCode": Account.primaryOwner.owner.legalAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.legalAddress.country ? Account.primaryOwner.owner.legalAddress.country.code2Letters : "US"] || "USA"
         },
         "mailingAddress": {
             "streetLine1": Account.primaryOwner.owner.mailingAddress.line1,
             "streetLine2": Account.primaryOwner.owner.mailingAddress.line2,
             "city": Account.primaryOwner.owner.mailingAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.mailingAddress.state,
             "postalCode": Account.primaryOwner.owner.mailingAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.mailingAddress.country ? Account.primaryOwner.owner.mailingAddress.country.code2Letters : "US"] || "USA"
         },
         "previousAddress": {
             "streetLine1": Account.primaryOwner.owner.previousLegalAddress.line1,
             "streetLine2": Account.primaryOwner.owner.previousLegalAddress.line2,
             "city": Account.primaryOwner.owner.previousLegalAddress.city,
             "stateOrProvince": Account.primaryOwner.owner.previousLegalAddress.state,
             "postalCode": Account.primaryOwner.owner.previousLegalAddress.postalCode,
             "country": countries[Account.primaryOwner.owner.previousLegalAddress.country ? Account.primaryOwner.owner.previousLegalAddress.country.code2Letters : "US"] || "USA"
         }
     });             
     if (Account.primaryOwner.owner.regulatoryDisclosuresV0){
         set(payload.requests[0].entityHolder.contact, "affiliationsGroup", {
             "nasdGroup": {
                 "nasd": Account.primaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity,
                 "nasdType": Account.primaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer,
                 "nasdEntity": Account.primaryOwner.owner.regulatoryDisclosuresV0.firmNameForEmployee
             },
             "companyGroup": {
                 "publicCompany": Account.primaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany,
                 "publicCompanyType": Account.primaryOwner.owner.regulatoryDisclosuresV0.officerRole,
                 "publicCompanyNameOrSymbol": Account.primaryOwner.owner.regulatoryDisclosuresV0.firmNameForOfficer || Account.primaryOwner.owner.regulatoryDisclosuresV0.firmTickerForOfficer
             },
             "foreignGroup": {
                 "foreignOfficial": Account.primaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial,
                 "foreignOfficialCountry": countries[Account.primaryOwner.owner.regulatoryDisclosuresV0.foreignCountryName] || "USA"
             }
         });
     }
     if (includes(Account.tradingPrivileges, "Margins", 0)){
       set(payload.requests[0].entityHolder, "marginsAgreement", {
         // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020", ?? 
         "documentRevision": "Margin Agreement|CO02|03.2019",
         "holderESignature": "YES"
       });
     }
     if (includes(Account.tradingPrivileges, "Options", 0)){
       set(payload.requests[0].entityHolder, "optionsAgreement", {
         // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
         "documentRevision": "Option Agreement|CO04|03.2019",
         "holderESignature": "YES"
       });
     }
     set(payload.requests[0].entityHolder, "accountAgreement", {
         "documentRevision": "Account Application|CO01|03.2019 (002)", // ?? Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", // Not in docs
         "holderESignature": "YES"
     });
 }
 
 return payload;