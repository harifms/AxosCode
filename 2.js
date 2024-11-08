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

if (Account.primaryOwner.trustedContact){
    set(payload.requests[0], "trustedContact", {
        "name": [Account.primaryOwner.trustedContact.firstName, Account.primaryOwner.trustedContact.middleName, Account.primaryOwner.trustedContact.lastName].join(' '),
        "relationship": Account.primaryOwner.trustedContactRelationship,
        "phone": replace(Account.primaryOwner.trustedContact.primaryPhoneNumber, " ", ""),
        "email": Account.primaryOwner.trustedContact.primaryEmail 
    });
    if (Account.primaryOwner.trustedContact.mailingAddress){
        set(payload.requests[0].trustedContact, "address", {
            "streetLine1": Account.primaryOwner.trustedContact.mailingAddress.line1,
            "streetLine2": Account.primaryOwner.trustedContact.mailingAddress.line2,
            "city": Account.primaryOwner.trustedContact.mailingAddress.city,
            "stateOrProvince": Account.primaryOwner.trustedContact.mailingAddress.state,
            "postalCode": Account.primaryOwner.trustedContact.mailingAddress.postalCode,
            "country": countries[Account.primaryOwner.trustedContact.mailingAddress.country ? Account.primaryOwner.trustedContact.mailingAddress.country.code2Letters : "US"] || "USA"
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
                "country": countries[address.country ? address.country.code2Letters : "US"] || "USA"
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