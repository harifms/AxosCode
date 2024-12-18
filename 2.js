let principalName = (Account.nickName || Account.primaryOwner.owner.firstName || Account.registrationType) + "_" + accountNumber;
let accountName = skipError(substring(principalName, 0, 30), principalName);
let payload = {
    "requestId": requestId,
    "requests": [
        {
            "fundingFeatures": {
                "fundingSource": Account.initialFundingSource,
                "fundingSpecifics": Account.otherInitialFundingSource,
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
                "annualExpenses": Account.annualExpenses || 0,
                "specialExpenses": Account.specialExpenses || 0,
                "specialExpenseTimeFrame": Account.specialExpensesTimeframe,
                "timeHorizon": Account.timeHorizon
            },
            "enableMargin": includes(Account.tradingPrivileges, "Margin", 0) ? "YES" : "NO",
            "enableOptions": includes(Account.tradingPrivileges, "Options", 0) ? "YES" : "NO",
            "enableFpl": "NO",
            "w9": {
                "exemptPayee": Account.primaryOwner.owner.backupWithholdingExemptPayeeCode || "NA",
                "factaCode": Account.primaryOwner.owner.fatcaReportingExemptionCode || "NA"
            },
            "accountName": accountName,
            "repCode": Account.repCodeLink.repCode,
            "principalName": accountName,
            "openedDate": Account.createdAt,
            "accountNumber": accountNumber,
            "accountType": Account.registrationType
        }
    ]
};

if (payload.requests[0].enableOptions == "YES") {
    set(payload.requests[0], "optionsLevel", Account.optionsRiskLevel);
}

if (Account.advisorTradingDiscretion){
    set(payload.requests[0], "discretion", Account.advisorTradingDiscretion == "Full" ? "FULL" : (Account.advisorTradingDiscretion == "Limited" ? "LIMITED" : "OTHER"));
}

if (Account.primaryOwner.trustedContact && !Account.primaryOwner.trustedContactInfoDeclined) {
    set(payload.requests[0], "trustedContact", {
        "name": [Account.primaryOwner.trustedContact.firstName, Account.primaryOwner.trustedContact.middleName, Account.primaryOwner.trustedContact.lastName].join(' '),
        "relationship": Account.primaryOwner.trustedContactRelationship,
        "phone": replace(Account.primaryOwner.trustedContact.primaryPhoneNumber, " ", ""),
        "email": Account.primaryOwner.trustedContact.primaryEmail
    });
    if (Account.primaryOwner.trustedContact.mailingAddress) {
        set(payload.requests[0].trustedContact, "address", {
            "streetLine1": Account.primaryOwner.trustedContact.mailingAddress.line1,
            "streetLine2": Account.primaryOwner.trustedContact.mailingAddress.line2,
            "city": Account.primaryOwner.trustedContact.mailingAddress.city,
            "stateOrProvince": Account.primaryOwner.trustedContact.mailingAddress.state.code,
            "postalCode": Account.primaryOwner.trustedContact.mailingAddress.postalCode,
            "country": countries[Account.primaryOwner.trustedContact.mailingAddress.country ? Account.primaryOwner.trustedContact.mailingAddress.country.code2Letters : "US"] || "USA"
        });
    }
}

if (addBeneficiaries && (Account.beneficiaries || Account.contingentBeneficiaries)) {
    let beneficiaries = [];
    if (Account.beneficiaries) {
        for (let beneficiary of Account.beneficiaries) {
            if (!beneficiary.isContingentBeneficiary) {
                beneficiaries = concat(beneficiaries, beneficiary);
            }
        }
    }
    if (Account.contingentBeneficiaries && Account.contingentBeneficiaries.length > 0 && indexOf(['INDIVIDUAL-TOD', 'TENANTS-ENTIRETY', 'JOINT-TENANTS-RIGHT-SURV'], account.registrationType, 0) == -1) {
        beneficiaries = beneficiaries.concat(Account.contingentBeneficiaries);
    } else {
        set(Account, "contingentBeneficiaries", []);
    }
    set(payload.requests[0], "beneficiaries", []);
    let relationshipMap = {
        "Expectancy Table Distribution Begins": "EXPECTANCY_TABLE_DISTRIBUTIONS_BEGIN",
        "Expectancy Table Distribution 5 year depletion": "EXPECTANCY_TABLE_FIVE_YEARS_DEPLETION",
        "Expectancy Table Distribution 10 year depletion": "EXPECTANCY_TABLE_TEN_YEARS_DEPLETION",
        "Joint Elapsed RMD": "JOINT_ELAPSED_RMD",
        "Other": "OTHER",
        "Single Recal RMD": "SINGLE_RECALC_RMD",
        "Spouse": "SPOUSE",
        "Joint Recalculation": "JOINT_RECALCULATION"
    };
    for (let beneficiary of beneficiaries) {
        let relationship = beneficiary.rmdOption ? relationshipMap[beneficiary.rmdOption] : "OTHER";
        let beneficiaryPayload = {
            "percentage": beneficiary.percentage,
            "relationship": relationship || "OTHER",
            "relationshipDescription": beneficiary.relationship == "Spouse" ? "SPOUSE" : "OTHER",
            "type": !beneficiary.isContingentBeneficiary ? "PRIMARY" : "CONTINGENT",
            "beginDate": currentDate()
        };
        let address = beneficiary.beneficiary.legalAddress;
        if (address) {
            set(beneficiaryPayload, "address", {
                "streetLine1": address.line1,
                "streetLine2": address.line2,
                "city": address.city,
                "stateOrProvince": isPresent(address.state) ? address.state.code : null,
                "postalCode": address.postalCode,
                "country": countries[address.country ? address.country.code2Letters : "US"] || "USA"
            });
        }
        if (beneficiary.beneficiaryType == 'Entity' || beneficiary.beneficiaryType == 'Estate') {
            set(beneficiaryPayload, "individualOrEntity", "ENTITY");
            set(beneficiaryPayload, "taxId", beneficiary.beneficiary.ein);
            set(beneficiaryPayload, "taxIdFormat", "TIN");
            set(beneficiaryPayload, "entityName", beneficiary.beneficiary.fullName);
        } else {
            set(beneficiaryPayload, "individualOrEntity", "INDIVIDUAL");
            set(beneficiaryPayload, "taxId", beneficiary.beneficiary.ssNOrTaxID);
            set(beneficiaryPayload, "taxIdFormat", "SSN");
            set(beneficiaryPayload, "name", {
                "middleInitial": skipError(substring(beneficiary.beneficiary.middleName, 0, 1), null),
                "givenName": beneficiary.beneficiary.firstName,
                "familyName": beneficiary.beneficiary.lastName
            });
        }
        set(beneficiaryPayload, "birthDate", beneficiary.beneficiary.dateOfBirth);
        set(payload.requests[0], "beneficiaries", concat(payload.requests[0].beneficiaries, beneficiaryPayload));
    }
}

return payload;