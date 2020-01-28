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
    isBuyable: false,
    damageSelf: 2,
    onDiscard: {
      damageSelf: 2
    }
  },
  {
    name: 'Burn',
    image: 'burn',
    rarity: 'common',
    isBuyable: false,
    damageSelf: 1,
    onDiscard: {
      damageSelf: 1
    }
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
].map(card => createCard({
  ...card,
  type: 'potion',
  banishesOnPlay: true
}));
