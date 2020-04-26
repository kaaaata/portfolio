import { colors } from '../../styles';

export const rarityColors = {
  common: colors.sand,
  uncommon: colors.green,
  rare: colors.blue,
  legendary: colors.red
};

export const rarityScore = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3
};

export const upgradeRarity = (rarity) => {
  if (rarity === 'common') {
    return 'uncommon';
  } else if (rarity === 'uncommon') {
    return 'rare';
  } else {
    return 'legendary';
  }
};
