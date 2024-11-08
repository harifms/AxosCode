if (account.registrationType != "INDIVIDUAL" && account.registrationType != "IRA_TRADITIONAL" && account.registrationType != "IRA_ROTH" && account.registrationType != "IRA_SIMPLE" && account.registrationType != "IRA_SEP"){
	let coHolder = {
		"name": {
			"givenName": Account.secondaryOwner.owner.firstName,
			"middleInitial": Account.secondaryOwner.owner.middleName,
			"familyName": Account.secondaryOwner.owner.lastName
		},
		"birthDate": Account.secondaryOwner.owner.dateOfBirth,
		"gender": Account.secondaryOwner.owner.gender,
		"citizenship": {
			"citizenshipStatus": Account.secondaryOwner.owner.citizenshipStatus ? Account.secondaryOwner.owner.citizenshipStatus : countries["US"],
			"taxJurisdiction": Account.secondaryOwner.owner.citizenshipStatus == "RESIDENT" ? "US" : "OTHER",
			"countryOfResidence": Account.secondaryOwner.owner.citizenshipStatus == "RESIDENT" || !Account.secondaryOwner.owner.citizenshipStatus || !Account.secondaryOwner.owner.countryOfResidence ? countries["US"] : countries[Account.secondaryOwner.owner.countryOfResidence.code2Letters]
		},
		"ssn": Account.secondaryOwner.owner.ssNOrTaxID,
        "numDependents": Account.secondaryOwner.owner.numberOfDependents,
        "maritalStatus": Account.secondaryOwner.owner.maritalStatus,
		"homeType": Account.secondaryOwner.owner.homeOwnership,
        "email": Account.secondaryOwner.owner.secondaryEmail,
		"accountAgreement": {
			"documentRevision": "Account Application|CO01|03.2019 (002)", // ?? Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", // Not in docs
			"holderESignature": "YES"
		},
		"employment": {
            "employmentStatus": Account.secondaryOwner.owner.employmentStatus,
            "occupation": Account.secondaryOwner.owner.occupation,
            "natureOfBusiness": Account.secondaryOwner.owner.natureOfBusiness,
            "employer": Account.secondaryOwner.owner.employer,
            "yearsEmployed": Account.secondaryOwner.owner.yearsEmployed || 0,
            "workPhone": replace(Account.secondaryOwner.owner.employerPhoneNumber, " ", "")
        },
		"contact": {
			"phone": replace(Account.secondaryOwner.owner.secondaryPhoneNumber, " ", "")
		}
	};
         
	if (Account.secondaryOwner.owner.proofOfIdentity){
		set(coHolder, "patriotAct", {
			"idType": Account.secondaryOwner.owner.proofOfIdentity.type,
			"idNumber": Account.secondaryOwner.owner.proofOfIdentity.idNumber,
			"issuedByCountry": Account.secondaryOwner.owner.proofOfIdentity.issuingCountry,
			"issuedByState": Account.secondaryOwner.owner.proofOfIdentity.issuingState,
			"issueDate": Account.secondaryOwner.owner.proofOfIdentity.issueDate,
			"expirationDate": Account.secondaryOwner.owner.proofOfIdentity.expiryDate
		});
	}
	if (Account.secondaryOwner.owner.employerAddress){
		set(coHolder.employment, "workAddress", {
			"streetLine1": Account.secondaryOwner.owner.employerAddress.line1,
			"streetLine2": Account.secondaryOwner.owner.employerAddress.line1,
			"city": Account.secondaryOwner.owner.employerAddress.city,
			"stateOrProvince": Account.secondaryOwner.owner.employerAddress.state,
			"postalCode": Account.secondaryOwner.owner.employerAddress.postalCode,
			"country": Account.secondaryOwner.owner.employerAddress.country || "USA"
		});
	}
    if (Account.secondaryOwner.owner.legalAddress){
        set(coHolder.contact, "legalAddress", {
            "streetLine1": Account.secondaryOwner.owner.legalAddress.line1,
            "streetLine2": Account.secondaryOwner.owner.legalAddress.line2,
            "city": Account.secondaryOwner.owner.legalAddress.city,
            "stateOrProvince": Account.secondaryOwner.owner.legalAddress.state,
            "postalCode": Account.secondaryOwner.owner.legalAddress.postalCode,
            "country": Account.secondaryOwner.owner.legalAddress.country || "USA"
        });
    }
    if (Account.secondaryOwner.owner.mailingAddress){
        set(coHolder.contact, "mailingAddress", {
            "streetLine1": Account.secondaryOwner.owner.mailingAddress.line1,
            "streetLine2": Account.secondaryOwner.owner.mailingAddress.line2,
            "city": Account.secondaryOwner.owner.mailingAddress.city,
            "stateOrProvince": Account.secondaryOwner.owner.mailingAddress.state,
            "postalCode": Account.secondaryOwner.owner.mailingAddress.postalCode,
            "country": Account.secondaryOwner.owner.mailingAddress.country || "USA"
        });
    }
    if (Account.secondaryOwner.owner.previousLegalAddress){
        set(coHolder.contact, "previousAddress", {
            "streetLine1": Account.secondaryOwner.owner.previousLegalAddress.line1,
            "streetLine2": Account.secondaryOwner.owner.previousLegalAddress.line2,
            "city": Account.secondaryOwner.owner.previousLegalAddress.city,
            "stateOrProvince": Account.secondaryOwner.owner.previousLegalAddress.state,
            "postalCode": Account.secondaryOwner.owner.previousLegalAddress.postalCode,
            "country": Account.secondaryOwner.owner.previousLegalAddress.country || "USA"
        });
    }
    if (Account.secondaryOwner.owner.regulatoryDisclosuresV0){
        set(coHolder.contact, "affiliationsGroup", {
            "nasdGroup": {
                "nasd": Account.secondaryOwner.owner.regulatoryDisclosuresV0.employedBySecurityIndustryEntity,
                "nasdType": Account.secondaryOwner.owner.regulatoryDisclosuresV0.typeOfEmployer,
                "nasdEntity": Account.secondaryOwner.owner.regulatoryDisclosuresV0.firmNameForEmployee
            },
            "companyGroup": {
                "publicCompany": Account.secondaryOwner.owner.regulatoryDisclosuresV0.directorOrOfficerInPublicCompany,
                "publicCompanyType": Account.secondaryOwner.owner.regulatoryDisclosuresV0.officerRole,
                "publicCompanyNameOrSymbol": Account.secondaryOwner.owner.regulatoryDisclosuresV0.firmNameForOfficer || Account.secondaryOwner.owner.regulatoryDisclosuresV0.firmTickerForOfficer
            },
            "foreignGroup": {
                "foreignOfficial": Account.secondaryOwner.owner.regulatoryDisclosuresV0.seniorMilitaryGovermentOrPoliticalOfficial,
                "foreignOfficialCountry": countries[Account.secondaryOwner.owner.regulatoryDisclosuresV0.foreignCountryName] || "USA"
            }
        });
    } 
    if (includes(Account.tradingPrivileges, "Margins", 0)){
      set(coHolder, "marginsAgreement", {
        // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020", ?? 
        "documentRevision": "Margin Agreement|CO02|03.2019",
        "holderESignature": "YES"
      });
    }
    if (includes(Account.tradingPrivileges, "Options", 0)){
      set(coHolder, "optionsAgreement", {
        // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
        "documentRevision": "Option Agreement|CO04|03.2019",
        "holderESignature": "YES"
      });
    }
    set(coHolder, "accountAgreement", {
        "documentRevision": "Account Application|CO01|03.2019 (002)", // ?? Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", // Not in docs
        "holderESignature": "YES"
    });
    set(payload.requests[0], "coHolders", [coHolder]);
}

return payload;