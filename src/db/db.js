import Dexie from 'dexie';

export const db = new Dexie('FuelDB');

// id is auto-incremented
db.version(1).stores({
  abastecimentos: '++id, data, valor, litros, odometro'
});
