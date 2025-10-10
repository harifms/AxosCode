let i = 0;

set(Account, "primaryOwner.owner.investmentExperienceEquities",
  (Account.primaryOwner.owner.investmentExperienceEquities!=null&&trim(Account.primaryOwner.owner.investmentExperienceEquities)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investmentExperienceEquities))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investmentExperienceEquities))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
);

set(Account, "primaryOwner.owner.investmentExperienceMutualFunds",
  (Account.primaryOwner.owner.investmentExperienceMutualFunds!=null&&trim(Account.primaryOwner.owner.investmentExperienceMutualFunds)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investmentExperienceMutualFunds))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investmentExperienceMutualFunds))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
);

set(Account, "primaryOwner.owner.investmentExperienceFixedIncome",
  (Account.primaryOwner.owner.investmentExperienceFixedIncome!=null&&trim(Account.primaryOwner.owner.investmentExperienceFixedIncome)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investmentExperienceFixedIncome))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investmentExperienceFixedIncome))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
   );

set(Account, "primaryOwner.owner.investmentExperienceOptions",
   (Account.primaryOwner.owner.investmentExperienceOptions!=null&&trim(Account.primaryOwner.owner.investmentExperienceOptions)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investmentExperienceOptions))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investmentExperienceOptions))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
   );

set(Account, "primaryOwner.owner.investExperienceFutures",
  (Account.primaryOwner.owner.investExperienceFutures!=null&&trim(Account.primaryOwner.owner.investExperienceFutures)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investExperienceFutures))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investExperienceFutures))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
   );

set(Account, "primaryOwner.owner.investmentExperienceAnnuities",
  (Account.primaryOwner.owner.investmentExperienceAnnuities!=null&&trim(Account.primaryOwner.owner.investmentExperienceAnnuities)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investmentExperienceAnnuities))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investmentExperienceAnnuities))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
   );

set(Account, "primaryOwner.owner.investExperienceAlternatives",
  (Account.primaryOwner.owner.investExperienceAlternatives!=null&&trim(Account.primaryOwner.owner.investExperienceAlternatives)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investExperienceAlternatives))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investExperienceAlternatives))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
   );

set(Account, "primaryOwner.owner.investExperienceMargin",
  (Account.primaryOwner.owner.investExperienceMargin!=null&&trim(Account.primaryOwner.owner.investExperienceMargin)!="" ?  (toInteger(trim(Account.primaryOwner.owner.investExperienceMargin))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(Account.primaryOwner.owner.investExperienceMargin))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
   );

if (isPresent(Account.secondaryOwners)) {
  i = 0;
  for (let o of Account.secondaryOwners) {
    if (isPresent(o.owner)) {
      set(Account.secondaryOwners[i], "owner.investmentExperienceEquities",
          (o.owner.investmentExperienceEquities!=null&&trim(o.owner.investmentExperienceEquities)!="" ?  (toInteger(trim(o.owner.investmentExperienceEquities))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investmentExperienceEquities))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investmentExperienceMutualFunds",
        (o.owner.investmentExperienceMutualFunds!=null&&trim(o.owner.investmentExperienceMutualFunds)!="" ?  (toInteger(trim(o.owner.investmentExperienceMutualFunds))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investmentExperienceMutualFunds))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investmentExperienceFixedIncome",
       (o.owner.investmentExperienceFixedIncome!=null&&trim(o.owner.investmentExperienceFixedIncome)!="" ?  (toInteger(trim(o.owner.investmentExperienceFixedIncome))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investmentExperienceFixedIncome))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investmentExperienceOptions",
        (o.owner.investmentExperienceOptions!=null&&trim(o.owner.investmentExperienceOptions)!="" ?  (toInteger(trim(o.owner.investmentExperienceOptions))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investmentExperienceOptions))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investExperienceFutures",
       (o.owner.investExperienceFutures!=null&&trim(o.owner.investExperienceFutures)!="" ?  (toInteger(trim(o.owner.investExperienceFutures))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investExperienceFutures))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investmentExperienceAnnuities",
        (o.owner.investmentExperienceAnnuities!=null&&trim(o.owner.investmentExperienceAnnuities)!="" ?  (toInteger(trim(o.owner.investmentExperienceAnnuities))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investmentExperienceAnnuities))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investExperienceAlternatives",
       (o.owner.investExperienceAlternatives!=null&&trim(o.owner.investExperienceAlternatives)!="" ?  (toInteger(trim(o.owner.investExperienceAlternatives))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investExperienceAlternatives))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );

      set(Account.secondaryOwners[i], "owner.investExperienceMargin",
        (o.owner.investExperienceMargin!=null&&trim(o.owner.investExperienceMargin)!="" ?  (toInteger(trim(o.owner.investExperienceMargin))<=0 ? "NO_EXPERIENCE" : (toInteger(trim(o.owner.investExperienceMargin))>5 ? "OVER_5_YEARS"  : "FROM_1_TO_5_YEARS")): "NO_EXPERIENCE")
         );
    }
    i = i + 1;
  }
}


set(Account, "liquidityNeeds", (!Account.liquidityNeeds || Account.liquidityNeeds == "") ? 'UNDER_1_YEAR' :
  (Account.liquidityNeeds >= 1 && Account.liquidityNeeds < 5 ? 'FROM_1_TO_5_YEARS' :
    (Account.liquidityNeeds >= 5 && Account.liquidityNeeds < 10 ? 'FROM_5_TO_10_YEARS' :
      (Account.liquidityNeeds >= 10 && Account.liquidityNeeds < 15 ? 'FROM_10_TO_15_YEARS' : 'OVER_15_YEARS')
    )
  ));

set(Account, "specialExpensesTimeframe", (!Account.specialExpensesTimeframe || Account.specialExpensesTimeframe == "" || Account.specialExpensesTimeframe < 3) ? 'UNDER_2_YEARS' :
  (Account.specialExpensesTimeframe >= 3 && Account.specialExpensesTimeframe <= 5 ? 'FROM_3_TO_5_YEARS' :
    (Account.specialExpensesTimeframe > 5 && Account.specialExpensesTimeframe <= 10 ? 'FROM_6_TO_10_YEARS' : null)
  ));

let horizonMap = {
  'not specified': 'NOT_APPLICABLE',
  'less than 1 year': 'UNDER_1_YEAR',
  '1 - 5 years': 'FROM_1_TO_5_YEARS',
  '5 - 10 years': 'FROM_5_TO_10_YEARS',
  '10 - 15 years': 'FROM_10_TO_15_YEARS',
  'over 15 years': 'OVER_15_YEARS'
};
if (Account.timeHorizon) {
  set(Account, 'timeHorizon', horizonMap[toLower(Account.timeHorizon)]);
} else {
  set(Account, 'timeHorizon', 'NOT_APPLICABLE');
}

if (Account.federalMarginalTaxRate) {
  set(Account, "federalMarginalTaxRate", replace(Account.federalMarginalTaxRate, "%", ""));
}

let optionsRiskLevelMap = {
  'Covered calls': 1,
  'Purchase calls & puts': 2,
  'Spreads/long straddles': 3,
  'Equity puts writing': 4,
  'Uncovered call writing': 5,
  'Uncovered index options': 6,
  "1 - Covered calls": 1,
  "2 - Purchase calls & puts": 2,
  "3 - Spreads/long straddles": 3,
  "4 - Equity puts writing": 4,
  "5 - Uncovered call writing": 5,
  "6 - Uncovered index options": 6
};
set(Account, 'optionsRiskLevel', optionsRiskLevelMap[Account.optionsRiskLevel] || 6);

return Account;