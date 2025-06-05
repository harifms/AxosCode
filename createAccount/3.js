let affiliationsGroup = {};
if (Account.registrationType != "TRUST_IRREVOCABLE" && Account.registrationType != "TRUST_REVOCABLE") {
    let phoneNumberCleaned = replace(removeCharacters(Account.primaryOwner.owner.primaryPhoneNumber, [" ", "(", ")", "-", "+"]), "-", "");
    set(payload.requests[0], "individualHolder", {
        "name": {
            "givenName": Account.primaryOwner.owner.firstName,
            "middleInitial": skipError(substring(Account.primaryOwner.owner.middleName, 0, 1), null),
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
            "employmentStatus": Account.primaryOwner.owner.employmentStatus
        },
        "homeType": Account.primaryOwner.owner.homeOwnership,
        "email": Account.primaryOwner.owner.primaryEmail,
        "contact": {
            "phone": phoneNumberCleaned
        },
        "externalClientId": Account.primaryOwner.owner.id
    });

    if (Account.primaryOwner.owner.employmentStatus != "UNEMPLOYED") {
        let empPhoneNumberCleaned = Account.primaryOwner.owner.employerPhoneNumber ? replace(removeCharacters(Account.primaryOwner.owner.employerPhoneNumber, [" ", "(", ")", "-", "+"]), "-", "") : null;
        set(payload.requests[0].individualHolder, "employment", {
            "employmentStatus": Account.primaryOwner.owner.employmentStatus,
            "occupation": Account.primaryOwner.owner.occupation,
            "natureOfBusiness": Account.primaryOwner.owner.natureOfBusiness,
            "employer": Account.primaryOwner.owner.employer,
            "yearsEmployed": Account.primaryOwner.owner.yearsEmployed || 0,
            "workPhone": empPhoneNumberCleaned
        });
    }
    set(payload.requests[0].individualHolder.contact, "affiliationsGroup", affiliationsGroup);
    affiliationsGroup = {};
    if (Account.primaryOwner.owner.securitiesIndustryAffiliation && Account.primaryOwner.owner.securitiesIndustryAffiliation.enabled) {
        set(affiliationsGroup, "nasdGroup", {
            "nasd": Account.primaryOwner.owner.securitiesIndustryAffiliation.firmNameForEmployee,
            "nasdType": Account.primaryOwner.owner.securitiesIndustryAffiliation.typeOfEmployer,
            "nasdEntity": Account.primaryOwner.owner.securitiesIndustryAffiliation.firmNameForEmployee
        });
    } else {
        set(affiliationsGroup, "nasdGroup", {
            "nasd": "NO",
            "nasdType": null,
            "nasdEntity": null
        });
    }

    if (Account.primaryOwner.owner.publicCompanyOfficial && Account.primaryOwner.owner.publicCompanyOfficial.enabled) {
        set(affiliationsGroup, "companyGroup", {
            "publicCompany": Account.primaryOwner.owner.publicCompanyOfficial.firmNameForOfficer,
            "publicCompanyType": Account.primaryOwner.owner.publicCompanyOfficial.relationshipOfOfficer,
            "publicCompanyNameOrSymbol": Account.primaryOwner.owner.publicCompanyOfficial.firmTickerForOfficer || Account.primaryOwner.owner.publicCompanyOfficial.firmNameForOfficer
        });
    } else {
        set(affiliationsGroup, "companyGroup", {
            "publicCompany": "NO",
            "publicCompanyType": null,
            "publicCompanyNameOrSymbol": null
        });
    }

    if (Account.primaryOwner.owner.foreignOfficial && Account.primaryOwner.owner.foreignOfficial.enabled) {
        set(affiliationsGroup, "foreignGroup", {
            "foreignOfficial": "YES",
            "foreignOfficialCountry": countries[Account.primaryOwner.owner.foreignOfficial.foreignCountryName && Account.primaryOwner.owner.foreignOfficial.foreignCountryName.code2Letters] || "USA"
        });
    } else {
        set(affiliationsGroup, "foreignGroup", {
            "foreignOfficial": "NO",
            "foreignOfficialCountry": null
        });
    }
    set(payload.requests[0].individualHolder.contact, "affiliationsGroup", affiliationsGroup);

    if (Account.primaryOwner.owner.proofOfIdentity) {
        let patriotActVal = {
            "idType": Account.primaryOwner.owner.proofOfIdentity.type,
            "idNumber": Account.primaryOwner.owner.proofOfIdentity.idNumber,
            "issuedByCountry": countries[Account.primaryOwner.owner.proofOfIdentity.issuingCountry ? Account.primaryOwner.owner.proofOfIdentity.issuingCountry.code2Letters : "US"] || "USA",
            "issueDate": Account.primaryOwner.owner.proofOfIdentity.issueDate,
            "expirationDate": Account.primaryOwner.owner.proofOfIdentity.expiryDate
        };
        if (Account.primaryOwner.owner.proofOfIdentity.issuingState) {
            set(patriotActVal, "issuingState", Account.primaryOwner.owner.proofOfIdentity.issuingState.code);
        }
        set(payload.requests[0].individualHolder, "patriotAct", patriotActVal);
    }
    if (Account.primaryOwner.owner.employerAddress) {
        set(payload.requests[0].individualHolder.employment, "workAddress", {
            "streetLine1": Account.primaryOwner.owner.employerAddress.line1,
            "streetLine2": Account.primaryOwner.owner.employerAddress.line2,
            "city": Account.primaryOwner.owner.employerAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.employerAddress.state.code,
            "postalCode": Account.primaryOwner.owner.employerAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.employerAddress.country ? Account.primaryOwner.owner.employerAddress.country.code2Letters : "US"] || "USA"
        });
    }
    if (Account.primaryOwner.owner.legalAddress) {
        set(payload.requests[0].individualHolder.contact, "legalAddress", {
            "streetLine1": Account.primaryOwner.owner.legalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.legalAddress.line2,
            "city": Account.primaryOwner.owner.legalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.legalAddress.state.code,
            "postalCode": Account.primaryOwner.owner.legalAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.legalAddress.country ? Account.primaryOwner.owner.legalAddress.country.code2Letters : "US"] || "USA"
        });
    }
    if (Account.primaryOwner.owner.mailingAddress) {
        set(payload.requests[0].individualHolder.contact, "mailingAddress", {
            "streetLine1": Account.primaryOwner.owner.mailingAddress.line1,
            "streetLine2": Account.primaryOwner.owner.mailingAddress.line2,
            "city": Account.primaryOwner.owner.mailingAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.mailingAddress.state.code,
            "postalCode": Account.primaryOwner.owner.mailingAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.mailingAddress.country ? Account.primaryOwner.owner.mailingAddress.country.code2Letters : "US"] || "USA"
        });
    }
    if (Account.primaryOwner.owner.previousLegalAddress) {
        set(payload.requests[0].individualHolder.contact, "previousAddress", {
            "streetLine1": Account.primaryOwner.owner.previousLegalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.previousLegalAddress.line2,
            "city": Account.primaryOwner.owner.previousLegalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.previousLegalAddress.state.code,
            "postalCode": Account.primaryOwner.owner.previousLegalAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.previousLegalAddress.country ? Account.primaryOwner.owner.previousLegalAddress.country.code2Letters : "US"] || "USA"
        });
    }

    if (includes(Account.tradingPrivileges, "Margin", 0)) {
        set(payload.requests[0].individualHolder, "marginsAgreement", {
            "documentRevision": Account.isManaged ? "Margin Agreement|CO02-R|03.2020" : "Margin Agreement|CO02|03.2019",
            "holderESignature": "YES"
        });
    }
    if (includes(Account.tradingPrivileges, "Options", 0)) {
        set(payload.requests[0].individualHolder, "optionsAgreement", {
            "documentRevision": "Option Agreement|CO04|03.2019",
            "holderESignature": "YES"
        });
    }
    set(payload.requests[0].individualHolder, "accountAgreement", {
        "documentRevision": Account.isManaged ? "Account Application-RIA|CO10|10.22" : "Account Application|COO1|04.2024",
        "holderESignature": "YES"
    });
} else {
    set(payload.requests[0], "entityHolder", {
        "entityName": Account.primaryOwner.owner.fullName,
        "entityFormationDate": Account.primaryOwner.owner.dateOfBirth,
        "citizenship": {
            "citizenshipStatus": Account.primaryOwner.owner.citizenshipStatus ? Account.primaryOwner.owner.citizenshipStatus : countries["US"],
            "taxJurisdiction": Account.primaryOwner.owner.citizenshipStatus == "RESIDENT" ? "US" : "OTHER",
            "countryOfResidence": Account.primaryOwner.owner.citizenshipStatus == "RESIDENT" || !Account.primaryOwner.owner.citizenshipStatus || !Account.primaryOwner.owner.countryOfResidence ? countries["US"] : countries[Account.primaryOwner.owner.countryOfResidence.code2Letters]
        },
        "itin": Account.primaryOwner.owner.ein,
        "externalClientId": Account.primaryOwner.owner.id
    });
    let bizPhoneNumberCleaned = Account.primaryOwner.owner.businessPhoneNumber ? replace(removeCharacters(Account.primaryOwner.owner.businessPhoneNumber, [" ", "(", ")", "-", "+"]), "-", "") : null;
    set(payload.requests[0].entityHolder, "contact", {
        "phone": bizPhoneNumberCleaned,
        "legalAddress": {
            "streetLine1": Account.primaryOwner.owner.legalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.legalAddress.line2,
            "city": Account.primaryOwner.owner.legalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.legalAddress.state.code,
            "postalCode": Account.primaryOwner.owner.legalAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.legalAddress.country ? Account.primaryOwner.owner.legalAddress.country.code2Letters : "US"] || "USA"
        },
        "mailingAddress": {
            "streetLine1": Account.primaryOwner.owner.mailingAddress.line1,
            "streetLine2": Account.primaryOwner.owner.mailingAddress.line2,
            "city": Account.primaryOwner.owner.mailingAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.mailingAddress.state.code,
            "postalCode": Account.primaryOwner.owner.mailingAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.mailingAddress.country ? Account.primaryOwner.owner.mailingAddress.country.code2Letters : "US"] || "USA"
        },
        "previousAddress": {
            "streetLine1": Account.primaryOwner.owner.previousLegalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.previousLegalAddress.line2,
            "city": Account.primaryOwner.owner.previousLegalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.previousLegalAddress.state.code,
            "postalCode": Account.primaryOwner.owner.previousLegalAddress.postalCode,
            "country": countries[Account.primaryOwner.owner.previousLegalAddress.country ? Account.primaryOwner.owner.previousLegalAddress.country.code2Letters : "US"] || "USA"
        }
    });

    affiliationsGroup = {};
    if (Account.primaryOwner.owner.securitiesIndustryAffiliation && Account.primaryOwner.owner.securitiesIndustryAffiliation.enabled) {
        set(affiliationsGroup, "nasdGroup", {
            "nasd": Account.primaryOwner.owner.securitiesIndustryAffiliation.firmNameForEmployee,
            "nasdType": Account.primaryOwner.owner.securitiesIndustryAffiliation.typeOfEmployer,
            "nasdEntity": Account.primaryOwner.owner.securitiesIndustryAffiliation.firmNameForEmployee
        });
    } else {
        set(affiliationsGroup, "nasdGroup", {
            "nasd": "NO",
            "nasdType": null,
            "nasdEntity": null
        });
    }

    if (Account.primaryOwner.owner.publicCompanyOfficial && Account.primaryOwner.owner.publicCompanyOfficial.enabled) {
        set(affiliationsGroup, "companyGroup", {
            "publicCompany": Account.primaryOwner.owner.publicCompanyOfficial.firmNameForOfficer,
            "publicCompanyType": Account.primaryOwner.owner.publicCompanyOfficial.relationshipOfOfficer,
            "publicCompanyNameOrSymbol": Account.primaryOwner.owner.publicCompanyOfficial.firmTickerForOfficer || Account.primaryOwner.owner.publicCompanyOfficial.firmNameForOfficer
        });
    } else {
        set(affiliationsGroup, "companyGroup", {
            "publicCompany": "NO",
            "publicCompanyType": null,
            "publicCompanyNameOrSymbol": null
        });
    }

    if (Account.primaryOwner.owner.foreignOfficial && Account.primaryOwner.owner.foreignOfficial.enabled) {
        set(affiliationsGroup, "foreignGroup", {
            "foreignOfficial": "YES",
            "foreignOfficialCountry": countries[Account.primaryOwner.owner.foreignOfficial.foreignCountryName && Account.primaryOwner.owner.foreignOfficial.foreignCountryName.code2Letters] || "USA"
        });
    } else {
        set(affiliationsGroup, "foreignGroup", {
            "foreignOfficial": "NO",
            "foreignOfficialCountry": null
        });
    }
    set(payload.requests[0].entityHolder.contact, "affiliationsGroup", affiliationsGroup);

    if (includes(Account.tradingPrivileges, "Margin", 0)) {
        set(payload.requests[0].entityHolder, "marginsAgreement", {
            "documentRevision": Account.isManaged ? "Margin Agreement|CO02-R|03.2020" : "Margin Agreement|CO02|03.2019",
            "holderESignature": "YES"
        });
    }
    if (includes(Account.tradingPrivileges, "Options", 0)) {
        set(payload.requests[0].entityHolder, "optionsAgreement", {
            "documentRevision": "Option Agreement|CO04|03.2019",
            "holderESignature": "YES"
        });
    }
    set(payload.requests[0].entityHolder, "accountAgreement", {
        "documentRevision": Account.isManaged ? "Account Application-RIA|CO10|10.22" : "Account Application|COO1|04.2024",
        "holderESignature": "YES"
    });
}

return payload;