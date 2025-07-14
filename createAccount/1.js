let Account = account;

set(Account, "primaryOwner.owner.mailingAddress", extendedAccount.primaryOwner.owner.mailingAddress);
set(Account, "primaryOwner.owner.legalAddress", extendedAccount.primaryOwner.owner.legalAddress);
if (Account.primaryOwner.includeTrustedContact && extendedAccount.primaryOwner.trustedContact != null) {
    set(Account, "primaryOwner.trustedContact", extendedAccount.primaryOwner.trustedContact);
    set(Account, "primaryOwner.trustedContact.legalAddress", extendedAccount.primaryOwner.trustedContact.legalAddress);
    set(Account, "primaryOwner.trustedContact.mailingAddress", extendedAccount.primaryOwner.trustedContact.mailingAddress);
}
set(Account, "primaryOwner.owner.previousLegalAddress", extendedAccount.primaryOwner.owner.previousLegalAddress);
set(Account, "primaryOwner.owner.employerAddress", extendedAccount.primaryOwner.owner.employerAddress);
set(Account, "primaryOwner.owner.proofOfIdentity", extendedAccount.primaryOwner.owner.proofOfIdentity);
set(Account, "primaryOwner.owner.regulatoryDisclosuresV0", extendedAccount.primaryOwner.owner.regulatoryDisclosuresV0);

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

if (Account.primaryOwner.owner.middleName) {
    set(Account, "primaryOwner.owner.middleName", skipError(substring(Account.primaryOwner.owner.middleName, 0, 1), Account.primaryOwner.owner.middleName));
}

let genderTypesMap = {
    "Male": "MALE",
    "Female": "FEMALE",
    "No Answer": "NO_ANSWER"
};
set(Account, "primaryOwner.owner.gender", genderTypesMap[Account.primaryOwner.owner.gender] || genderTypesMap["No Answer"]);


let residencyStatusMap = {
    "US Citizen": "RESIDENT",
    "Resident Alien": "RESIDENT_ALIEN",
    "Non-Resident Alien": "NON_RESIDENT_ALIEN"
};
set(Account, "primaryOwner.owner.citizenshipStatus", Account.primaryOwner.owner.citizenshipStatus ? residencyStatusMap[Account.primaryOwner.owner.citizenshipStatus] : residencyStatusMap["US Citizen"]);
set(Account, "primaryOwner.owner.countryOfCitizenship", residencyStatusMap[Account.primaryOwner.owner.citizenshipStatus]);


let maritalStatusMap = {
    "Single": "SINGLE",
    "Married": "MARRIED",
    "Widowed": "WIDOWED",
    "Divorced": "DIVORCED"
};
set(Account, "primaryOwner.owner.maritalStatus", maritalStatusMap[Account.primaryOwner.owner.maritalStatus]);

if (
    extendedAccount &&
    extendedAccount.primaryOwner &&
    extendedAccount.primaryOwner.owner
) {
    if (extendedAccount.primaryOwner.owner.countryOfCitizenship) {
        set(Account, "primaryOwner.owner.countryOfCitizenship", extendedAccount.primaryOwner.owner.countryOfCitizenship);
    }
    if (extendedAccount.primaryOwner.owner.countryOfResidence) {
        set(Account, "primaryOwner.owner.countryOfResidence", extendedAccount.primaryOwner.owner.countryOfResidence);
    }
    if (extendedAccount.primaryOwner.owner.mailingAddress) {
        set(Account, "primaryOwner.owner.mailingAddress", extendedAccount.primaryOwner.owner.mailingAddress);
    }
    if (extendedAccount.primaryOwner.owner.legalAddress) {
        set(Account, "primaryOwner.owner.legalAddress", extendedAccount.primaryOwner.owner.legalAddress);
    }
    if (extendedAccount.primaryOwner.owner.previousLegalAddress) {
        set(Account, "primaryOwner.owner.previousLegalAddress", extendedAccount.primaryOwner.owner.previousLegalAddress);
    }
    if (extendedAccount.primaryOwner.owner.employerAddress) {
        set(Account, "primaryOwner.owner.employerAddress", extendedAccount.primaryOwner.owner.employerAddress);
    }
    if (extendedAccount.primaryOwner.owner.proofOfIdentity) {
        set(Account, "primaryOwner.owner.proofOfIdentity", extendedAccount.primaryOwner.owner.proofOfIdentity);
    }
    if (extendedAccount.primaryOwner.owner.securitiesIndustryAffiliation) {
        set(Account, "primaryOwner.owner.securitiesIndustryAffiliation", extendedAccount.primaryOwner.owner.securitiesIndustryAffiliation);
    }
    if (extendedAccount.primaryOwner.owner.foreignOfficial) {
        set(Account, "primaryOwner.owner.foreignOfficial", extendedAccount.primaryOwner.owner.foreignOfficial);
    }
    if (extendedAccount.primaryOwner.owner.publicCompanyOfficial) {
        set(Account, "primaryOwner.owner.publicCompanyOfficial", extendedAccount.primaryOwner.owner.publicCompanyOfficial);
    }
    if (extendedAccount.primaryOwner.trustedContact) {
        set(Account, "primaryOwner.trustedContact", extendedAccount.primaryOwner.trustedContact);
    }
    if (extendedAccount.primaryOwner.owner.associatedWithBrokerDealer) {
        set(Account, "primaryOwner.owner.associatedWithBrokerDealer", extendedAccount.primaryOwner.owner.associatedWithBrokerDealer);
    }
    if (extendedAccount.primaryOwner.owner.associatedWithOtherBrokerDealer) {
        set(Account, "primaryOwner.owner.associatedWithOtherBrokerDealer", extendedAccount.primaryOwner.owner.associatedWithOtherBrokerDealer);
    }
    if (extendedAccount.primaryOwner.owner.accreditedInvestor) {
        set(Account, "primaryOwner.owner.accreditedInvestor", extendedAccount.primaryOwner.owner.accreditedInvestor);
    }
    if (extendedAccount.primaryOwner.owner.associatedWithInvestmentAdvisor) {
        set(Account, "primaryOwner.owner.associatedWithInvestmentAdvisor", extendedAccount.primaryOwner.owner.associatedWithInvestmentAdvisor);
    }
    if (extendedAccount.primaryOwner.owner.relatedToPublicCompanyOfficial) {
        set(Account, "primaryOwner.owner.relatedToPublicCompanyOfficial", extendedAccount.primaryOwner.owner.relatedToPublicCompanyOfficial);
    }
}

// Secondary Owners
if (
    extendedAccount &&
    extendedAccount.secondaryOwners &&
    size(extendedAccount.secondaryOwners) > 0
) {
    let i = 0;
    for (let o of extendedAccount.secondaryOwners) {
        if (o && o.owner) {
            if (isPresent(o.owner)) {
                set(Account.secondaryOwners[i], "owner.citizenshipStatus", o.owner.citizenshipStatus ? residencyStatusMap[o.owner.citizenshipStatus] : residencyStatusMap["US Citizen"]);
                set(Account.secondaryOwners[i], "owner.countryOfCitizenship", residencyStatusMap[o.owner.citizenshipStatus]);
            }
            if (isPresent(o.owner)) {
                set(Account.secondaryOwners[i], "owner.maritalStatus", maritalStatusMap[o.owner.maritalStatus]);
            }
            if (isPresent(o.owner)) {
                set(Account.secondaryOwners[i], "owner.gender", genderTypesMap[o.owner.gender] || genderTypesMap["No Answer"]);
            }
            if (isPresent(o.owner)) {
                set(Account.secondaryOwners[i], "owner.middleName", skipError(substring(o.owner.middleName, 0, 1), o.owner.middleName));
            }
            if (o.owner.countryOfCitizenship) {
                set(Account.secondaryOwners[i], "owner.countryOfCitizenship", o.owner.countryOfCitizenship);
            }
            if (o.owner.countryOfResidence) {
                set(Account.secondaryOwners[i], "owner.countryOfResidence", o.owner.countryOfResidence);
            }
            if (o.owner.mailingAddress) {
                set(Account.secondaryOwners[i], "owner.mailingAddress", o.owner.mailingAddress);
            }
            if (o.owner.legalAddress) {
                set(Account.secondaryOwners[i], "owner.legalAddress", o.owner.legalAddress);
            }
            if (o.owner.previousLegalAddress) {
                set(Account.secondaryOwners[i], "owner.previousLegalAddress", o.owner.previousLegalAddress);
            }
            if (o.owner.employerAddress) {
                set(Account.secondaryOwners[i], "owner.employerAddress", o.owner.employerAddress);
            }
            if (o.owner.proofOfIdentity) {
                set(Account.secondaryOwners[i], "owner.proofOfIdentity", o.owner.proofOfIdentity);
            }
            if (o.owner.securitiesIndustryAffiliation) {
                set(Account.secondaryOwners[i], "owner.securitiesIndustryAffiliation", o.owner.securitiesIndustryAffiliation);
            }
            if (o.owner.foreignOfficial) {
                set(Account.secondaryOwners[i], "owner.foreignOfficial", o.owner.foreignOfficial);
            }
            if (o.owner.publicCompanyOfficial) {
                set(Account.secondaryOwners[i], "owner.publicCompanyOfficial", o.owner.publicCompanyOfficial);
            }
            if (o.trustedContact) {
                set(Account.secondaryOwners[i], "trustedContact", o.trustedContact);
            }
            if (o.owner.associatedWithBrokerDealer) {
                set(Account.secondaryOwners[i], "owner.associatedWithBrokerDealer", o.owner.associatedWithBrokerDealer);
            }
            if (o.owner.associatedWithOtherBrokerDealer) {
                set(Account.secondaryOwners[i], "owner.associatedWithOtherBrokerDealer", o.owner.associatedWithOtherBrokerDealer);
            }
            if (o.owner.accreditedInvestor) {
                set(Account.secondaryOwners[i], "owner.accreditedInvestor", o.owner.accreditedInvestor);
            }
            if (o.owner.associatedWithInvestmentAdvisor) {
                set(Account.secondaryOwners[i], "owner.associatedWithInvestmentAdvisor", o.owner.associatedWithInvestmentAdvisor);
            }
            if (o.owner.relatedToPublicCompanyOfficial) {
                set(Account.secondaryOwners[i], "owner.relatedToPublicCompanyOfficial", o.owner.relatedToPublicCompanyOfficial);
            }
        }

        i = i + 1;
    }
}

if (
    extendedAccount &&
    extendedAccount.beneficiaries &&
    size(extendedAccount.beneficiaries) > 0
) {
    let j = 0;
    for (let o of extendedAccount.beneficiaries) {
        if (o && o.beneficiary) {
            if (o.beneficiary.countryOfCitizenship) {
                set(Account.beneficiaries[j], "beneficiary.countryOfCitizenship", o.beneficiary.countryOfCitizenship);
            }
            if (o.beneficiary.countryOfResidence) {
                set(Account.beneficiaries[j], "beneficiary.countryOfResidence", o.beneficiary.countryOfResidence);
            }
            if (o.beneficiary.mailingAddress) {
                set(Account.beneficiaries[j], "beneficiary.mailingAddress", o.beneficiary.mailingAddress);
            }
            if (o.beneficiary.legalAddress) {
                set(Account.beneficiaries[j], "beneficiary.legalAddress", o.beneficiary.legalAddress);
            }
            if (o.beneficiary.previousLegalAddress) {
                set(Account.beneficiaries[j], "beneficiary.previousLegalAddress", o.beneficiary.previousLegalAddress);
            }
            if (o.beneficiary.employerAddress) {
                set(Account.beneficiaries[j], "beneficiary.employerAddress", o.beneficiary.employerAddress);
            }
            if (o.beneficiary.proofOfIdentity) {
                set(Account.beneficiaries[j], "beneficiary.proofOfIdentity", o.beneficiary.proofOfIdentity);
            }
            if (o.beneficiary.foreignOfficial) {
                set(Account.beneficiaries[j], "beneficiary.foreignOfficial", o.beneficiary.foreignOfficial);
            }
            if (o.beneficiary.publicCompanyOfficial) {
                set(Account.beneficiaries[j], "beneficiary.publicCompanyOfficial", o.beneficiary.publicCompanyOfficial);
            }
            if (o.beneficiary.associatedWithBrokerDealer) {
                set(Account.beneficiaries[j], "beneficiary.associatedWithBrokerDealer", o.beneficiary.associatedWithBrokerDealer);
            }
            if (o.beneficiary.securitiesIndustryAffiliation) {
                set(Account.beneficiaries[j], "beneficiary.securitiesIndustryAffiliation", o.beneficiary.securitiesIndustryAffiliation);
            }
            if (o.beneficiary.associatedWithOtherBrokerDealer) {
                set(Account.beneficiaries[j], "beneficiary.associatedWithOtherBrokerDealer", o.beneficiary.associatedWithOtherBrokerDealer);
            }
            if (o.beneficiary.accreditedInvestor) {
                set(Account.beneficiaries[j], "beneficiary.accreditedInvestor", o.beneficiary.accreditedInvestor);
            }
            if (o.beneficiary.associatedWithInvestmentAdvisor) {
                set(Account.beneficiaries[j], "beneficiary.associatedWithInvestmentAdvisor", o.beneficiary.associatedWithInvestmentAdvisor);
            }
            if (o.beneficiary.relatedToPublicCompanyOfficial) {
                set(Account.beneficiaries[j], "beneficiary.relatedToPublicCompanyOfficial", o.beneficiary.relatedToPublicCompanyOfficial);
            }
        }
        j = j + 1;
    }
}

if (
    extendedAccount &&
    extendedAccount.contingentBeneficiaries &&
    size(extendedAccount.contingentBeneficiaries) > 0
) {
    let k = 0;
    for (let o of extendedAccount.contingentBeneficiaries) {
        if (o && o.beneficiary) {
            if (o.beneficiary.countryOfCitizenship) {
                set(Account.contingentBeneficiaries[k], "beneficiary.countryOfCitizenship", o.beneficiary.countryOfCitizenship);
            }
            if (o.beneficiary.countryOfResidence) {
                set(Account.contingentBeneficiaries[k], "beneficiary.countryOfResidence", o.beneficiary.countryOfResidence);
            }
            if (o.beneficiary.mailingAddress) {
                set(Account.contingentBeneficiaries[k], "beneficiary.mailingAddress", o.beneficiary.mailingAddress);
            }
            if (o.beneficiary.legalAddress) {
                set(Account.contingentBeneficiaries[k], "beneficiary.legalAddress", o.beneficiary.legalAddress);
            }
            if (o.beneficiary.previousLegalAddress) {
                set(Account.contingentBeneficiaries[k], "beneficiary.previousLegalAddress", o.beneficiary.previousLegalAddress);
            }
            if (o.beneficiary.employerAddress) {
                set(Account.contingentBeneficiaries[k], "beneficiary.employerAddress", o.beneficiary.employerAddress);
            }
            if (o.beneficiary.proofOfIdentity) {
                set(Account.contingentBeneficiaries[k], "beneficiary.proofOfIdentity", o.beneficiary.proofOfIdentity);
            }
            if (o.beneficiary.foreignOfficial) {
                set(Account.contingentBeneficiaries[k], "beneficiary.foreignOfficial", o.beneficiary.foreignOfficial);
            }
            if (o.beneficiary.publicCompanyOfficial) {
                set(Account.contingentBeneficiaries[k], "beneficiary.publicCompanyOfficial", o.beneficiary.publicCompanyOfficial);
            }
            if (o.beneficiary.associatedWithBrokerDealer) {
                set(Account.contingentBeneficiaries[k], "beneficiary.associatedWithBrokerDealer", o.beneficiary.associatedWithBrokerDealer);
            }
            if (o.beneficiary.securitiesIndustryAffiliation) {
                set(Account.contingentBeneficiaries[k], "beneficiary.securitiesIndustryAffiliation", o.beneficiary.securitiesIndustryAffiliation);
            }
            if (o.beneficiary.associatedWithOtherBrokerDealer) {
                set(Account.contingentBeneficiaries[k], "beneficiary.associatedWithOtherBrokerDealer", o.beneficiary.associatedWithOtherBrokerDealer);
            }
            if (o.beneficiary.accreditedInvestor) {
                set(Account.contingentBeneficiaries[k], "beneficiary.accreditedInvestor", o.beneficiary.accreditedInvestor);
            }
            if (o.beneficiary.associatedWithInvestmentAdvisor) {
                set(Account.contingentBeneficiaries[k], "beneficiary.associatedWithInvestmentAdvisor", o.beneficiary.associatedWithInvestmentAdvisor);
            }
            if (o.beneficiary.relatedToPublicCompanyOfficial) {
                set(Account.contingentBeneficiaries[k], "beneficiary.relatedToPublicCompanyOfficial", o.beneficiary.relatedToPublicCompanyOfficial);
            }
        }
        j = j + 1;
    }
}
return Account;