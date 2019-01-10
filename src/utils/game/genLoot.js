import { sample, random, uniq } from 'lodash';
import models from './models';

const { itemData, itemBonuses, rarities, bonusBaseStat } = models;
const uniqRight = arr => uniq(arr.reverse()).reverse();

const applyLevelModifier = (value, level, rarity) => {
  const modifiers = [
    1.1 ** (level - 1), // level
    rarity.statModifier, // rarity
    random(0.95, 1.05) // volatility
  ];

  return Math.ceil(value * modifiers.reduce((a, b) => a * b));
};

const genItemBonuses = (rarity) => {
  let bonusCount = sample(rarity.bonusCount);
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
      return uniqRight([bonuses[0].prefix, itemType, 'of', bonuses[1].suffix]).join(' ');
    case 3:
      return sample([true, false])
        ? uniqRight([bonuses[0].prefix, bonuses[1].prefix, itemType, 'of', bonuses[2].suffix]).join(' ')
        : uniqRight([bonuses[0].prefix, itemType, 'of', bonuses[1].prefix, bonuses[2].suffix]).join(' ');
    case 4:
      return uniqRight([
        bonuses[0].prefix, bonuses[1].prefix, itemType, 'of', bonuses[2].prefix, bonuses[3].suffix
      ]).join(' ');
    default:
      break;
  }
};

const genItemStats = (item, bonuses, itemLevel, rarity) => {
  const itemStats = {};
  const isWeapon = item.slots.includes('weapon')
    || (item.slots.includes('offhand') && item.type !== 'Shield');
  const defaultBonuses = [];

  if (isWeapon) {
    itemStats.damage = applyLevelModifier(item.baseStat, itemLevel, rarity);
  } else {
    itemStats.armor = applyLevelModifier(item.baseStat, itemLevel, rarity);
  }

  bonuses.forEach((bonus) => {
    const bonusName = bonus.name;
    const bonusValue = applyLevelModifier(bonusBaseStat, itemLevel, rarity);

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
  let rarity = 'legendary';

  if (seed < commonLikelihood) {
    rarity = 'common';
  } else if (seed < commonLikelihood + uncommonLikelihood) {
    rarity = 'uncommon';
  } else if (seed < commonLikelihood + uncommonLikelihood + rareLikelihood) {
    rarity = 'rare';
  }

  return rarities.find(i => i.rarity === rarity);
};

export default (itemLevel = random(1, 10)) => {
  const item = sample(itemData);
  const rarity = genRarity();
  const spriteVariant = sample(item.sprite.variants);
  const sprite = `${item.sprite[rarity.rarity]}${spriteVariant}.png`;
  const bonuses = genItemBonuses(rarity);
  const name = genItemName(item.type, bonuses);
  const stats = genItemStats(item, bonuses, itemLevel, rarity);

  const decoratedItem = {
    ...item,
    name,
    rarity: rarity.rarity,
    sprite,
    itemLevel,
    stats
  };

  return decoratedItem;
};
