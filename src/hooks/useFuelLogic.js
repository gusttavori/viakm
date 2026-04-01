import { useState, useEffect } from 'react';
import { calculateSavingBasic, calculateSavingAdvanced } from '../utils/calculations';
import { db } from '../db/db';

export function useFuelLogic() {
  const [ethanolPrice, setEthanolPrice] = useState('');
  const [gasolinePrice, setGasolinePrice] = useState('');
  const [useAverage, setUseAverage] = useState(false);
  
  const [ethanolKm, setEthanolKm] = useState('');
  const [gasolineKm, setGasolineKm] = useState('');
  
  let result = null;
  
  if (ethanolPrice && gasolinePrice) {
    const ep = parseFloat(ethanolPrice.replace(',', '.'));
    const gp = parseFloat(gasolinePrice.replace(',', '.'));
    
    if (!isNaN(ep) && !isNaN(gp)) {
      if (!useAverage) {
        result = calculateSavingBasic(ep, gp);
      } else if (ethanolKm && gasolineKm) {
        const ekm = parseFloat(ethanolKm.replace(',', '.'));
        const gkm = parseFloat(gasolineKm.replace(',', '.'));
        
        if (!isNaN(ekm) && !isNaN(gkm)) {
          result = calculateSavingAdvanced(ep, gp, ekm, gkm);
        }
      }
    }
  }

  const saveRefuel = async (valor, litros, odometro) => {
    try {
      await db.abastecimentos.add({
        data: new Date().toISOString(),
        valor: parseFloat(valor),
        litros: parseFloat(litros),
        odometro: parseFloat(odometro)
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    ethanolPrice, setEthanolPrice,
    gasolinePrice, setGasolinePrice,
    useAverage, setUseAverage,
    ethanolKm, setEthanolKm,
    gasolineKm, setGasolineKm,
    result,
    saveRefuel
  };
}
