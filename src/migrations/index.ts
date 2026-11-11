import * as migration_20261111_125027_initial from './20261111_125027_initial.ts';

export const migrations = [
  {
    up: migration_20261111_125027_initial.up,
    down: migration_20261111_125027_initial.down,
    name: '20261111_125027_initial'
  },
];
