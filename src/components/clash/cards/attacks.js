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
    name: 'Chop',
    image: 'chop',
    rarity: 'common',
    attack: 1,
    defense: 1,
    pierce: 1
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
    name: 'Arrow',
    image: 'arrow',
    rarity: 'common',
    attack: 2,
    defense: 0,
    isBuyable: false
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
    name: 'Slice',
    image: 'slice',
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
    name: 'Fire Spear',
    image: 'fire_spear',
    rarity: 'uncommon',
    attack: 2,
    defense: 1,
    shuffleCardCopiesIntoOpponentsPiles: [{ card: 'Burn', pile: 'deck' }],
    description: 'Shuffle a copy of Burn into your opponent\'s deck.'
  },
  {
    name: 'Multishot',
    image: 'multishot',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow', 'Arrow'],
    description: 'Play three copies of Arrow.'
  },
  {
    name: 'Protect',
    image: 'block',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    temporaryStatGain: { defense: 1 },
    description: 'Gain +1 defense for the rest of the battle.'
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
  {
    name: 'Spiky Shot',
    image: 'spiky_bow',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow'],
    temporaryStatGain: { attack: 1 },
    description: 'Gain +1 Attack for the rest of the battle. Play two copies of Arrow.'
  },
  {
    name: 'Ice Blade',
    image: 'ice_sword',
    rarity: 'rare',
    attack: 2,
    defense: 5
  }
].map(card => createCard({
  ...card,
  type: 'attack'
}));
