if (isPresent(Account.secondaryOwners) && Account.registrationType != "INDIVIDUAL" && Account.registrationType != "IRA_TRADITIONAL" && Account.registrationType != "IRA_ROTH" && Account.registrationType != "IRA_SIMPLE" && Account.registrationType != "IRA_SEP") {
    let totalPercentage = 0;
    let coHolders = [];

    for (let o of Account.secondaryOwners) {
        if (isPresent(o.owner)) {
            let coHolder = {
                "name": {
                    "givenName": o.owner.firstName,
                    "middleInitial": skipError(substring(o.owner.middleName, 0, 1), ""),
                    "familyName": o.owner.lastName
                },
                "birthDate": o.owner.dateOfBirth,
                "gender": o.owner.gender,
                "citizenship": {
                    "citizenshipStatus": o.owner.citizenshipStatus ? o.owner.citizenshipStatus : countries["US"],
                    "taxJurisdiction": o.owner.citizenshipStatus == "RESIDENT" ? "US" : "OTHER",
                    "countryOfResidence": o.owner.citizenshipStatus == "RESIDENT" || !o.owner.citizenshipStatus || !o.owner.countryOfResidence ? countries["US"] : countries[o.owner.countryOfResidence.code2Letters]
                },
                "ssn": o.owner.ssNOrTaxID,
                "numDependents": o.owner.numberOfDependents,
                "maritalStatus": o.owner.maritalStatus,
                "homeType": o.owner.homeOwnership,
                "email": o.owner.primaryEmail,
                "accountAgreement": {
                    // "documentRevision": Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22",
                    "documentRevision": "Account Application|CO01|03.2019 (002)",
                    "holderESignature": "YES"
                },
                "employment": {
                    "employmentStatus": o.owner.employmentStatus,
                    "occupation": o.owner.occupation,
                    "natureOfBusiness": o.owner.natureOfBusiness,
                    "employer": o.owner.employer,
                    "yearsEmployed": o.owner.yearsEmployed || 0,
                    "workPhone": replace(o.owner.employerPhoneNumber, " ", "")
                },
                "contact": {
                    "phone": replace(o.owner.primaryPhoneNumber, " ", "")
                }
            };

            if (o.owner.proofOfIdentity) {
                let coHolderPatriotAct = {
                    "idType": o.owner.proofOfIdentity.type,
                    "idNumber": o.owner.proofOfIdentity.idNumber,
                    "issuedByCountry": countries[o.owner.proofOfIdentity.issuingCountry ? o.owner.proofOfIdentity.issuingCountry.code2Letters : "US"] || "USA",
                    "issueDate": o.owner.proofOfIdentity.issueDate,
                    "expirationDate": o.owner.proofOfIdentity.expiryDate
                };
                if (o.owner.proofOfIdentity.issuingState) {
                    set(coHolderPatriotAct, "issuingState", o.owner.proofOfIdentity.issuingState.code);
                }
                set(coHolder, "patriotAct", coHolderPatriotAct);
            }
            if (o.trustedContact && !o.trustedContactInfoDeclined) {
                set(coHolder, "trustedContact", {
                    "name": [o.trustedContact.firstName, Account.primaryOwner.trustedContact.middleName, Account.primaryOwner.trustedContact.lastName].join(' '),
                    "relationship": Account.primaryOwner.trustedContactRelationship,
                    "phone": replace(Account.primaryOwner.trustedContact.primaryPhoneNumber, " ", ""),
                    "email": Account.primaryOwner.trustedContact.primaryEmail
                });
                if (o.trustedContact.mailingAddress) {
                    set(coHolder.trustedContact, "address", {
                        "streetLine1": Account.primaryOwner.trustedContact.mailingAddress.line1,
                        "streetLine2": Account.primaryOwner.trustedContact.mailingAddress.line2,
                        "city": Account.primaryOwner.trustedContact.mailingAddress.city,
                        "stateOrProvince": Account.primaryOwner.trustedContact.mailingAddress.state.code,
                        "postalCode": Account.primaryOwner.trustedContact.mailingAddress.postalCode,
                        "country": countries[Account.primaryOwner.trustedContact.mailingAddress.country ? Account.primaryOwner.trustedContact.mailingAddress.country.code2Letters : "US"] || "USA"
                    });
                }
            }
            if (o.owner.employerAddress) {
                set(coHolder.employment, "workAddress", {
                    "streetLine1": o.owner.employerAddress.line1,
                    "streetLine2": o.owner.employerAddress.line1,
                    "city": o.owner.employerAddress.city,
                    "stateOrProvince": o.owner.employerAddress.state.code,
                    "postalCode": o.owner.employerAddress.postalCode,
                    "country": countries[o.owner.employerAddress.country ? o.owner.employerAddress.country.code2Letters : "US"] || "USA"
                });
            }
            if (o.owner.legalAddress) {
                set(coHolder.contact, "legalAddress", {
                    "streetLine1": o.owner.legalAddress.line1,
                    "streetLine2": o.owner.legalAddress.line2,
                    "city": o.owner.legalAddress.city,
                    "stateOrProvince": o.owner.legalAddress.state.code,
                    "postalCode": o.owner.legalAddress.postalCode,
                    "country": countries[o.owner.legalAddress.country ? o.owner.legalAddress.country.code2Letters : "US"] || "USA"
                });
            }
            if (o.owner.mailingAddress) {
                set(coHolder.contact, "mailingAddress", {
                    "streetLine1": o.owner.mailingAddress.line1,
                    "streetLine2": o.owner.mailingAddress.line2,
                    "city": o.owner.mailingAddress.city,
                    "stateOrProvince": o.owner.mailingAddress.state.code,
                    "postalCode": o.owner.mailingAddress.postalCode,
                    "country": countries[o.owner.mailingAddress.country ? o.owner.mailingAddress.country.code2Letters : "US"] || "USA"
                });
            }
            if (o.owner.previousLegalAddress) {
                set(coHolder.contact, "previousAddress", {
                    "streetLine1": o.owner.previousLegalAddress.line1,
                    "streetLine2": o.owner.previousLegalAddress.line2,
                    "city": o.owner.previousLegalAddress.city,
                    "stateOrProvince": o.owner.previousLegalAddress.state.code,
                    "postalCode": o.owner.previousLegalAddress.postalCode,
                    "country": countries[o.owner.previousLegalAddress.country ? o.owner.previousLegalAddress.country.code2Letters : "US"] || "USA"
                });
            }
            if (o.owner.regulatoryDisclosuresV0) {
                set(coHolder.contact, "affiliationsGroup", {
                    "nasdGroup": {
                        "nasd": o.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity,
                        "nasdType": o.owner.regulatoryDisclosuresV0.typeOfEmployer,
                        "nasdEntity": o.owner.regulatoryDisclosuresV0.firmNameForEmployee
                    },
                    "companyGroup": {
                        "publicCompany": o.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany,
                        "publicCompanyType": o.owner.regulatoryDisclosuresV0.officerRole,
                        "publicCompanyNameOrSymbol": o.owner.regulatoryDisclosuresV0.firmNameForOfficer || o.owner.regulatoryDisclosuresV0.firmTickerForOfficer
                    },
                    "foreignGroup": {
                        "foreignOfficial": o.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial,
                        "foreignOfficialCountry": countries[o.owner.regulatoryDisclosuresV0.foreignCountry ? o.owner.regulatoryDisclosuresV0.foreignCountry.code2Letters : "US"] || "USA"
                    }
                });
            }
            if (includes(Account.tradingPrivileges, "Margin", 0)) {
                set(coHolder, "marginsAgreement", {
                    // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020",
                    "documentRevision": "Margin Agreement|CO02|03.2019",
                    "holderESignature": "YES"
                });
            }
            if (includes(Account.tradingPrivileges, "Options", 0)) {
                set(coHolder, "optionsAgreement", {
                    // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
                    "documentRevision": "Option Agreement|CO04|03.2019",
                    "holderESignature": "YES"
                });
            }
            set(coHolder, "accountAgreement", {
                // "documentRevision": Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", 
                "documentRevision": "Account Application|CO01|03.2019 (002)", 
                "holderESignature": "YES"
            });
            totalPercentage = totalPercentage + o.percentage;
            coHolders = concat(coHolders, coHolder);
        }
    }
    set(payload.requests[0], "coHolders", coHolders);
    if (Account.registrationType != "TRUST_IRREVOCABLE" && Account.registrationType != "TRUST_REVOCABLE") {
        let jointAccount = {
            "jointTenantMarried": Account.primaryOwner.spouseIsAJointOwner ? "YES" : "NO",
            "numberOfJointTenants": coHolders.length - 1
        };

        if (Account.registrationType == "JOINT_TENANTS_IN_COMMON") {
            set(jointAccount, "jointHolderPercentage", totalPercentage);
        }
        set(payload.requests[0], "jointAccount", jointAccount);
    }
}

return payload;