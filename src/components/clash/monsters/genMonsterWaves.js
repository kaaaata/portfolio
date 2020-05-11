import { monstersByTier } from './monsters';
import { sampleSize } from 'lodash';

export const genMonsterWaves = () => [
  ...sampleSize(monstersByTier[1], 4),
  ...sampleSize(monstersByTier[2], 4),
  ...sampleSize(monstersByTier[3], 4)
];
