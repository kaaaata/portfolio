import { createCard } from './utils';

export const magic = [
  createCard({
    name: 'Fire',
    image: 'fire',
    rarity: 'common',
    attack: 2,
    defense: 0
  }),
].map(card => (
  {
    ...card,
    type: 'magic',
    banishes: true
  }
));
