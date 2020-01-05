import { createCard } from './utils';

export const potions = [
  createCard({
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'uncommon',
    heal: 3,
    onDiscard: {
      heal: 3
    }
  })
].map(card => (
  { ...card, type: 'potion' }
));
