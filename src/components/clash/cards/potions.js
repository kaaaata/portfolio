import { createCard } from './createCard';

export const potions = [
  {
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'uncommon',
    heal: 3,
    onDiscard: {
      heal: 3
    }
  },
  {
    name: 'Bomb',
    image: 'bomb',
    rarity: 'common',
    isToken: false,
    damageSelf: 2,
    onDiscard: {
      damageSelf: 2
    }
  },
  {
    name: 'Burn',
    image: 'burn',
    rarity: 'common',
    isToken: false,
    damageSelf: 1,
    onDiscard: {
      damageSelf: 1
    }
  },
  {
    name: 'Freeze',
    image: 'freeze',
    rarity: 'common',
    isToken: false
  },
  {
    name: 'Slime Potion',
    image: 'slime_potion',
    rarity: 'rare',
    damageSelf: 3,
    temporaryStatGain: {
      attack: 1,
      magic: 1,
      defense: 1
    },
    onDiscard: {
      damageSelf: 3,
      temporaryStatGain: {
        attack: 1,
        magic: 1,
        defense: 1
      },
    },
    description: 'Deal 3 damage to yourself. Gain +1 to Attack, Magic, and Defense for the rest of the battle.'
  },
  {
    name: 'Golden Goblet',
    image: 'golden_goblet',
    rarity: 'legendary',
    customEffect: true,
    heal: 7,
    onDiscard: {
      customEffect: true,
      heal: 7
    },
    description: 'Shuffle 7 cards from your banish into your discard. Heal 7.'
  }
].map(card => createCard({
  ...card,
  type: 'potion',
  banishesOnPlay: true
}));
