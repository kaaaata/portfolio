import { sample, random, find, uniq } from 'lodash';
import models from './models';

const { itemData, itemBonuses, rarities, bonusBaseStat } = models;

const applyLevelModifier = (value, level, rarityModifier) => {
  const levelModifier = 1.1 ** (level - 1);
  const volatilityModifier = random(0.95, 1.05);

  return Math.ceil(value * levelModifier * volatilityModifier);
};

const genItemBonuses = (rarity) => {
  let bonusCount = sample(find(rarities, i => i.rarity === rarity).bonusCount);
  const bonuses = [];

  while (bonusCount-- > 0) {
    bonuses.push(sample(itemBonuses));
  }

  return bonuses;
};

const genItemName = (itemType, bonuses) => {
  switch (bonuses.length) {
    case 0:
      return itemType;
    case 1:
      return [itemType, 'of', bonuses[0].suffix].join(' ');
    case 2:
      return uniq([bonuses[0].prefix, itemType, 'of', bonuses[1].suffix]).join(' ');
    case 3:
      return sample([true, false])
        ? uniq([bonuses[0].prefix, bonuses[1].prefix, itemType, 'of', bonuses[2].suffix]).join(' ')
        : uniq([bonuses[0].prefix, itemType, bonuses[1].prefix, 'of', bonuses[2].suffix]).join(' ');
    case 4:
      return uniq([
        bonuses[0].prefix, bonuses[1].prefix, itemType, 'of', bonuses[2].prefix, bonuses[3].suffix
      ]).join(' ');
    default:
      break;
  }
};

const genItemStats = (item, bonuses, itemLevel, rarityModifier) => {
  const itemStats = {};
  const isWeapon = item.slots.includes('weapon') || item.slots.includes('offhand');

  if (isWeapon) {
    itemStats.damage = applyLevelModifier(item.baseStat, itemLevel, rarityModifier);
  } else {
    itemStats.armor = applyLevelModifier(item.baseStat, itemLevel, rarityModifier);
  }

  bonuses.forEach((bonus) => {
    const bonusName = bonus.name;
    const bonusValue = applyLevelModifier(bonusBaseStat, itemLevel, rarityModifier);

    if (!itemStats.hasOwnProperty(bonusName)) {
      itemStats[bonusName] = bonusValue;
    } else {
      itemStats[bonusName] += bonusValue;
    }
  });

  return itemStats;
};

const genRarity = () => {
  const seed = random(100);

  const commonLikelihood = rarities.find(i => i.rarity === 'common').likelihood;
  const uncommonLikelihood = rarities.find(i => i.rarity === 'uncommon').likelihood;
  const rareLikelihood = rarities.find(i => i.rarity === 'rare').likelihood;

  if (seed < commonLikelihood) {
    return 'common';
  } else if (seed < commonLikelihood + uncommonLikelihood) {
    return 'uncommon';
  } else if (seed < commonLikelihood + uncommonLikelihood + rareLikelihood) {
    return 'rare';
  }

  return 'legendary';
};

export default (itemLevel = random(1, 10)) => {
  const item = sample(itemData);
  const rarity = genRarity();
  const spriteVariant = sample(item.sprite.variants);
  const sprite = `${item.sprite[rarity]}${spriteVariant}.png`;
  const bonuses = genItemBonuses(rarity);
  const name = genItemName(item.type, bonuses);
  const stats = genItemStats(item, bonuses, itemLevel, rarity.statModifier);

  const decoratedItem = {
    ...item,
    name,
    rarity,
    sprite,
    itemLevel,
    stats
  };

  return decoratedItem;
};
