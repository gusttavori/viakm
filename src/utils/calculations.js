// Basic 70% rule
export function calculateSavingBasic(ethanolPrice, gasolinePrice) {
  const ratio = ethanolPrice / gasolinePrice;
  const isEthanolBetter = ratio < 0.7;
  
  // To find savings per liter, calculate equivalent cost:
  // If we run on ethanol, we use 1 / 0.7 = 1.42x more liters.
  // Gasoline cost equivalent for ethanol volume = Ethanol Price / 0.7
  // Let's keep it simple: Compare the 70% threshold.
  const ethanolThreshold = gasolinePrice * 0.7;
  
  let savingsPerLiter = 0;
  let savingsPercent = 0;
  
  if (isEthanolBetter) {
    savingsPerLiter = ethanolThreshold - ethanolPrice;
    savingsPercent = (savingsPerLiter / ethanolThreshold) * 100;
  } else {
    // If gasoline is better, we compare how much cheaper gasoline is compared to ethanol efficiency equivalent
    const gasolineEquivalent = ethanolPrice / 0.7;
    savingsPerLiter = gasolineEquivalent - gasolinePrice;
    savingsPercent = (savingsPerLiter / gasolineEquivalent) * 100;
  }
  
  return {
    isEthanolBetter,
    savingsPerLiter,
    savingsPercent
  };
}

export function calculateSavingAdvanced(ethanolPrice, gasolinePrice, ethanolConsumption, gasolineConsumption) {
  const costPerKmEthanol = ethanolPrice / ethanolConsumption;
  const costPerKmGasoline = gasolinePrice / gasolineConsumption;
  
  const isEthanolBetter = costPerKmEthanol < costPerKmGasoline;
  
  let savingsPerKm = 0;
  let savingsPercent = 0;
  
  if (isEthanolBetter) {
    savingsPerKm = costPerKmGasoline - costPerKmEthanol;
    savingsPercent = (savingsPerKm / costPerKmGasoline) * 100;
  } else {
    savingsPerKm = costPerKmEthanol - costPerKmGasoline;
    savingsPercent = (savingsPerKm / costPerKmEthanol) * 100;
  }
  
  return {
    isEthanolBetter,
    savingsPerKm,
    savingsPercent
  };
}
