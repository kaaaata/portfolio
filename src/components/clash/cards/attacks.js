import { createCard } from './createCard';

export const attacks = [
  {
    name: 'Strike',
    image: 'strike',
    rarity: 'common',
    attack: 2,
    defense: 0
  },
  {
    name: 'Slash',
    image: 'slash',
    rarity: 'common',
    attack: 1,
    defense: 1
  },
  {
    name: 'Crush',
    image: 'crush',
    rarity: 'common',
    attack: 3,
    defense: 0
  },
  {
    name: 'Parry',
    image: 'parry',
    rarity: 'common',
    attack: 1,
    defense: 2
  },
  {
    name: 'Heavy Strike',
    image: 'heavy_strike',
    rarity: 'common',
    attack: 2,
    defense: 0,
    pierce: 1
  },
  {
    name: 'Piercing Blow',
    image: 'piercing_blow',
    rarity: 'uncommon',
    attack: 3,
    defense: 1,
    pierce: 1
  },
  {
    name: 'Chop',
    image: 'chop',
    rarity: 'uncommon',
    attack: 4,
    defense: 0
  },
  {
    name: 'Two Handed Strike',
    image: 'two_handed_strike',
    rarity: 'uncommon',
    attack: 4,
    defense: 1
  },
  {
    name: 'Sunder',
    image: 'sunder',
    rarity: 'rare',
    attack: 6,
    defense: 0,
    damageSelf: 3
  },
  {
    name: 'Healing Blade',
    image: 'fat_blue_sword',
    rarity: 'rare',
    attack: 3,
    defense: 0,
    heal: 3
  },
].map(card => createCard({
  ...card,
  type: 'attack'
}));
