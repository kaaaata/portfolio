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
    name: 'Ice Punch',
    image: 'ice_punch',
    rarity: 'common',
    attack: 1,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [{ card: 'Freeze', pile: 'deck' }],
    description: 'Shuffle a copy of Freeze into your opponent\'s deck.'
  },
  {
    name: 'Arrow',
    image: 'arrow',
    rarity: 'common',
    attack: 2,
    defense: 0,
    isToken: true
  },
  {
    name: 'Devastating Blow',
    image: 'piercing_blow',
    rarity: 'uncommon',
    attack: 3,
    defense: 0,
    dealsBanishingDamage: true
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
    playCopiesOfCards: ['Arrow', 'Arrow'],
    description: 'Play two copies of Arrow.'
  },
  {
    name: 'Protect',
    image: 'block',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    statBonuses: { defense: 1 },
    description: 'Gain +1 defense for the rest of the battle.'
  },
  {
    name: 'Lotus',
    image: 'lotus',
    rarity: 'uncommon',
    attack: 3,
    defense: 2
  },
  {
    name: 'Sunder',
    image: 'sunder',
    rarity: 'rare',
    attack: 8,
    defense: 0,
    damageSelf: 2
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
    statBonuses: { attack: 1 },
    description: 'Gain +1 Attack for the rest of the battle. Play two copies of Arrow.'
  },
  {
    name: 'Ice Blade',
    image: 'ice_sword',
    rarity: 'rare',
    attack: 2,
    defense: 4,
    shuffleCardCopiesIntoOpponentsPiles: [{ card: 'Freeze', pile: 'deck' }],
    description: 'Shuffle a copy of Freeze into your opponent\'s deck.'
  }
].map(card => createCard({
  ...card,
  type: 'attack'
}));
