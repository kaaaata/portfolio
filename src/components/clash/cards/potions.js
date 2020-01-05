import { createCard } from './utils';

export const potions = [
  createCard({
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'uncommon',
    heal: 4,
    onDiscard: {
      heal: 2
    }
  }),
  createCard({
    name: 'Bomb',
    image: 'bomb',
    rarity: 'uncommon',
    buyable: false,
    attack: 1,
    unblockable: true,
    onDiscard: {
      damageSelf: 3
    },
    description: 'Deal 1 damage. On discard: take 3 damage.'
  }),
].map(card => (
  { ...card, type: 'potion' }
));
