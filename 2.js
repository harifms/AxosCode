let payload = {
    "requestId": requestId,
    "requests": [
        {
            "fundingFeatures": {
                "fundingSource": Account.initialFundingSource,
                "fundingSpecifics": "ex adipisicing", //?? , 
                "moneyFundInstructions": Account.moneyFundSweepOptIn,
                "dividendCashOptions": Account.cashDividendOption,
                "dividendDripOptions": Account.dividendReinvestmentOption
            },
            "investmentProfile": {
                "annualIncomeRange": Account.annualIncome,
                "netWorthRange": Account.netWorthExcludingHome,
                "liquidNetWorthRange": Account.liquidAssets,
                "taxBracket": Account.federalMarginalTaxRate,
                "riskTolerance": Account.riskTolerance,
                "investmentValueRange": Account.estimatedValueOfInvestments,
                "investmentObjective": Account.investmentObjective,
                "investmentKnowledge": Account.investmentExperience,
                "stocksExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investmentExperienceEquities,
                    "transactionsPerYear": Account.primaryOwner.owner.investmentExperienceEquitiesTransactions || 0
                },
                "mutualFundsExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investmentExperienceMutualFunds,
                    "transactionsPerYear": Account.primaryOwner.owner.investmentExperienceMutualFundsTransactions || 0
                },
                "bondsExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investmentExperienceFixedIncome,
                    "transactionsPerYear": Account.primaryOwner.owner.investmentExperienceFixedIncomeTransactions || 0
                },
                "optionsExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investmentExperienceOptions,
                    "transactionsPerYear": Account.primaryOwner.owner.investmentExperienceOptionsTransactions || 0
                },
                "futuresExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investExperienceFutures,
                    "transactionsPerYear": Account.primaryOwner.owner.investExperienceFuturesTransactions || 0
                },
                "annuitiesExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investmentExperienceAnnuities,
                    "transactionsPerYear": Account.primaryOwner.owner.investmentExperienceAnnuitiesTransactions || 0
                },
                "alternativeInvestmentsExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investExperienceAlternatives,
                    "transactionsPerYear": Account.primaryOwner.owner.investExperienceAlternativesTransactions || 0
                },
                "marginsExperience": {
                    "assetExperienceRange": Account.primaryOwner.owner.investExperienceMargin,
                    "transactionsPerYear": Account.primaryOwner.owner.investExperienceMarginTransactions || 0
                },
                "liquidityNeeds": Account.liquidityNeeds,
                "annualExpenses": 0,//Account.annualExpenses,
                "specialExpenses": 0,//Account.specialExpenses,
                "specialExpenseTimeFrame": Account.specialExpensesTimeframe,
                "timeHorizon": Account.timeHorizon
            },
            "enableMargin": includes(Account.tradingPrivileges, "Margins", 0) ? "YES" : "NO",
            "enableOptions": includes(Account.tradingPrivileges, "Options", 0) ? "YES" : "NO", 
            "enableFpl": "NO",
            "w9": {
                "exemptPayee": Account.primaryOwner.owner.backupWithholdingExemptPayeeCode || "NA",
                "factaCode": Account.primaryOwner.owner.fatcaReportingExemptionCode || "NA"
            },
            "accountName": (Account.nickName || "Norberto") + "_my_" + accountNumber,
            "repCode": Account.repCodeLink.repCode,
            "principalName": (Account.nickName || "Norberto") + "_my_" + accountNumber,
            "openedDate": Account.createdAt, 
            "accountNumber": accountNumber,
            "accountType": Account.registrationType
        }
    ]
};

if (account.registrationType != "TRUST_IRREVOCABLE" && account.registrationType != "TRUST_REVOCABLE"){
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
            "country": Account.primaryOwner.owner.employerAddress.country || "USA"
        });
    }
    if (Account.primaryOwner.owner.legalAddress){
        set(payload.requests[0].individualHolder.contact, "legalAddress", {
            "streetLine1": Account.primaryOwner.owner.legalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.legalAddress.line2,
            "city": Account.primaryOwner.owner.legalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.legalAddress.state,
            "postalCode": Account.primaryOwner.owner.legalAddress.postalCode,
            "country": Account.primaryOwner.owner.legalAddress.country || "USA"
        });
    }
    if (Account.primaryOwner.owner.mailingAddress){
        set(payload.requests[0].individualHolder.contact, "mailingAddress", {
            "streetLine1": Account.primaryOwner.owner.mailingAddress.line1,
            "streetLine2": Account.primaryOwner.owner.mailingAddress.line2,
            "city": Account.primaryOwner.owner.mailingAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.mailingAddress.state,
            "postalCode": Account.primaryOwner.owner.mailingAddress.postalCode,
            "country": Account.primaryOwner.owner.mailingAddress.country || "USA"
        });
    }
    if (Account.primaryOwner.owner.previousLegalAddress){
        set(payload.requests[0].individualHolder.contact, "previousAddress", {
            "streetLine1": Account.primaryOwner.owner.previousLegalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.previousLegalAddress.line2,
            "city": Account.primaryOwner.owner.previousLegalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.previousLegalAddress.state,
            "postalCode": Account.primaryOwner.owner.previousLegalAddress.postalCode,
            "country": Account.primaryOwner.owner.previousLegalAddress.country || "USA"
        });
    }

    if (includes(Account.tradingPrivileges, "Margins", 0)){
      let marginsAgreement = {
        // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020", ?? 
        "documentRevision": "Margin Agreement|CO02|03.2019",
        "holderESignature": "YES"
      };
      set(payload.requests[0].individualHolder, "marginsAgreement", marginsAgreement);
    }
    if (includes(Account.tradingPrivileges, "Options", 0)){
      let optionsAgreement = {
        // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
        "documentRevision": "Option Agreement|CO04|03.2019",
        "holderESignature": "YES"
      };
      set(payload.requests[0].individualHolder, "optionsAgreement", optionsAgreement);
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
            "citizenshipStatus": Account.secondaryOwner.owner.citizenshipStatus ? Account.secondaryOwner.owner.citizenshipStatus : countries["US"],
            "taxJurisdiction": Account.secondaryOwner.owner.citizenshipStatus == "RESIDENT" ? "US" : "OTHER",
            "countryOfResidence": Account.secondaryOwner.owner.citizenshipStatus == "RESIDENT" || !Account.secondaryOwner.owner.citizenshipStatus || !Account.secondaryOwner.owner.countryOfResidence ? countries["US"] : countries[Account.secondaryOwner.owner.countryOfResidence.code2Letters]
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
            "country": Account.primaryOwner.owner.legalAddress.country || "USA"
        },
        "mailingAddress": {
            "streetLine1": Account.primaryOwner.owner.mailingAddress.line1,
            "streetLine2": Account.primaryOwner.owner.mailingAddress.line2,
            "city": Account.primaryOwner.owner.mailingAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.mailingAddress.state,
            "postalCode": Account.primaryOwner.owner.mailingAddress.postalCode,
            "country": Account.primaryOwner.owner.mailingAddress.country || "USA"
        },
        "previousAddress": {
            "streetLine1": Account.primaryOwner.owner.previousLegalAddress.line1,
            "streetLine2": Account.primaryOwner.owner.previousLegalAddress.line2,
            "city": Account.primaryOwner.owner.previousLegalAddress.city,
            "stateOrProvince": Account.primaryOwner.owner.previousLegalAddress.state,
            "postalCode": Account.primaryOwner.owner.previousLegalAddress.postalCode,
            "country": Account.primaryOwner.owner.previousLegalAddress.country || "USA"
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
      let marginsAgreement = {
        // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020", ?? 
        "documentRevision": "Margin Agreement|CO02|03.2019",
        "holderESignature": "YES"
      };
      set(payload.requests[0].entityHolder, "marginsAgreement", marginsAgreement);
    }
    if (includes(Account.tradingPrivileges, "Options", 0)){
      let optionsAgreement = {
        // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
        "documentRevision": "Option Agreement|CO04|03.2019",
        "holderESignature": "YES"
      };
      set(payload.requests[0].entityHolder, "optionsAgreement", optionsAgreement);
    }
    set(payload.requests[0].entityHolder, "accountAgreement", {
        "documentRevision": "Account Application|CO01|03.2019 (002)", // ?? Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", // Not in docs
        "holderESignature": "YES"
    });
}

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
		},
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
			"streetLine1": Account.secondaryOwner.owner.employerAddress.line1,line1,
			"streetLine2": AAccount.secondaryOwner.owner.employerAddress.line1,line2,
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
      let marginsAgreement = {
        // "documentRevision": Account.isManaged ? "Margin Agreement|CO02|03.2020" : "Margin Agreement|CO02-R|03.2020", ?? 
        "documentRevision": "Margin Agreement|CO02|03.2019",
        "holderESignature": "YES"
      };
      set(coHolder, "marginsAgreement", marginsAgreement);
    }
    if (includes(Account.tradingPrivileges, "Options", 0)){
      let optionsAgreement = {
        // "documentRevision": Account.isManaged ? "Option Agreement|CO04|03.2019" : "Option Agreement|CO04|03.2019",
        "documentRevision": "Option Agreement|CO04|03.2019",
        "holderESignature": "YES"
      };
      set(coHolder, "optionsAgreement", optionsAgreement);
    }
    set(coHolder, "accountAgreement", {
        "documentRevision": "Account Application|CO01|03.2019 (002)", // ?? Account.isManaged ? "Account Application|COO1|04.2024" : "Account Application-RIA|CO10|10.22", // Not in docs
        "holderESignature": "YES"
    });
    set(payload.requests[0], "coHolders", [coHolder]);
}

if (Account.primaryOwner.trustedContact){
    set(payload.requests[0], "trustedContact", {
        "name": [Account.primaryOwner.trustedContact.firstName, Account.primaryOwner.trustedContact.middleName, Account.primaryOwner.trustedContact.lastName].join(' '),
        "relationship": Account.primaryOwner.trustedContactRelationship,
        "phone": replace(Account.primaryOwner.trustedContact.primaryPhoneNumber, " ", ""),
        "email": Account.primaryOwner.trustedContact.primaryEmail 
    });
    if (Account.primaryOwner.trustedContact.legalAddress){
        set(payload.requests[0].trustedContact, "address", {
            "streetLine1": Account.primaryOwner.trustedContact.legalAddress.line1,
            "streetLine2": Account.primaryOwner.trustedContact.legalAddress.line2,
            "city": Account.primaryOwner.trustedContact.legalAddress.city,
            "stateOrProvince": Account.primaryOwner.trustedContact.legalAddress.state,
            "postalCode": Account.primaryOwner.trustedContact.postalCode,
            "country": Account.primaryOwner.trustedContact.country || "USA"
        });
    }
}



if (addBeneficiaries && (Account.beneficiaries || Account.contingentBeneficiaries)){
    let beneficiaries = [];
    if (Account.beneficiaries){
        for (let beneficiary of Account.beneficiaries){
            if (!beneficiary.isContingentBeneficiary) {
               beneficiaries = concat(beneficiaries, beneficiary); 
            }
        }
    }
    if (Account.contingentBeneficiaries && Account.contingentBeneficiaries.length > 0) {
        beneficiaries = beneficiaries.concat(Account.contingentBeneficiaries);
    } else {
        set(Account, "contingentBeneficiaries", []);
    }
    set(payload.requests[0], "beneficiaries", []);
    for (let beneficiary of beneficiaries){ 
        let beneficiaryPayload = {
            "name": {
                "middleInitial": beneficiary.beneficiary.middleName,
                "givenName": beneficiary.beneficiary.firstName,
                "familyName": beneficiary.beneficiary.lastName
            },
            "taxId": beneficiary.beneficiary.ssNOrTaxID,
            "birthDate": beneficiary.beneficiary.dateOfBirth, 
            "percentage": beneficiary.percentage,
            "relationship": beneficiary.relationship == "Spouse" ? "SPOUSE" : "OTHER",
            "type": beneficiary.isContingentBeneficiary == false ? "PRIMARY" : "CONTINGENT",
            "beginDate": currentDate()
        };
        let address = beneficiary.beneficiary.legalAddress;
        if (address){
            set(beneficiaryPayload, "address", {
                "streetLine1": address.line1,
                "streetLine2": address.line2,
                "city": address.city,
                "stateOrProvince": isPresent(address.state) ? address.state.code : null,
                "postalCode": address.postalCode,
                "country": countries[address.country.code2Letters] || "USA"
            });
        }
        if (beneficiary.beneficiary.personType == 'Entity' || beneficiary.beneficiary.personType == 'Estate'){
            set(beneficiaryPayload, "taxIdFormat", "TIN");
            set(beneficiaryPayload, "individualOrEntity", "INDIVIDUAL"); 
        } else {
            set(beneficiaryPayload, "taxIdFormat", "SSN");
            set(beneficiaryPayload, "individualOrEntity", "ENTITY"); 
        }
        set(payload.requests[0], "beneficiaries", concat(payload.requests[0].beneficiaries, beneficiaryPayload));
    }
}

return payload;