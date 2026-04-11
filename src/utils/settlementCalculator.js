export const getDepreciationRate = (vehicleAgeYears = 0) => {
  if (vehicleAgeYears <= 0) return 0;
  if (vehicleAgeYears === 1) return 0.05;
  if (vehicleAgeYears === 2) return 0.1;
  if (vehicleAgeYears === 3) return 0.15;
  if (vehicleAgeYears === 4) return 0.25;
  if (vehicleAgeYears === 5) return 0.35;
  return 0.4;
};

export const calculateSettlement = ({
  totalBill = 0,
  inadmissibleAmount = 0,
  vehicleAgeYears = 0,
  compulsoryExcess = 0,
  settlementMode = 'Cashless'
}) => {
  const depreciationRate = getDepreciationRate(vehicleAgeYears);
  const admissibleAmount = Math.max(totalBill - inadmissibleAmount, 0);
  const depreciationAmount = Math.round(admissibleAmount * depreciationRate);
  const afterDepreciation = Math.max(admissibleAmount - depreciationAmount, 0);
  const netPayable = settlementMode === 'Cashless'
    ? afterDepreciation
    : Math.max(afterDepreciation - compulsoryExcess, 0);
  const customerPays = settlementMode === 'Cashless'
    ? inadmissibleAmount + depreciationAmount + compulsoryExcess
    : totalBill - netPayable;

  return {
    depreciationRate,
    admissibleAmount,
    depreciationAmount,
    afterDepreciation,
    netPayable,
    customerPays
  };
};
