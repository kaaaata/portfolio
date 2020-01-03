import { createCard } from './utils';

export const potions = [
  createCard({
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'uncommon',
    heal: 3,
    onDiscard: {
      heal: 3
    },
    description: 'Heal 3.'
  }),
  createCard({
    name: 'Apple',
    image: 'apple',
    rarity: 'rare',
    heal: 4,
    onDiscard: {
      heal: 4
    }
  }),
  createCard({
    name: 'Cherry',
    image: 'cherry',
    rarity: 'common',
    heal: 1,
    onDiscard: {
      heal: 1
    }
  }),
  createCard({
    name: 'Famous Amos',
    image: 'famous_amos',
    rarity: 'rare',
    heal: 5,
    onDiscard: {
      heal: 5
    }
  }),
  createCard({
    name: 'Banana',
    image: 'banana',
    rarity: 'common',
    heal: 2,
    onDiscard: {
      heal: 2
    }
  }),
  createCard({
    name: 'Candy',
    image: 'candy',
    rarity: 'legendary',
    heal: 10,
    onDiscard: {
      heal: 10
    }
  }),
].map(card => (
  { ...card, type: 'potion' }
));
