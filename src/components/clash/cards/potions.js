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
    buyable: false,
    damageSelf: 2,
    onDiscard: {
      damageSelf: 2
    }
  },
  {
    name: 'Burn',
    image: 'burn',
    rarity: 'common',
    buyable: false,
    damageSelf: 1,
    onDiscard: {
      damageSelf: 1
    }
  },
].map(card => createCard({
  ...card,
  type: 'potion',
  banishesOnPlay: true
}));
