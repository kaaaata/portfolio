import { createCard } from './utils';

export const magic = [
  createCard({
    name: 'Fire',
    image: 'fire',
    rarity: 'common',
    attack: 2,
    defense: 0
  }),
  createCard({
    name: 'Tentacles',
    image: 'tentacles',
    rarity: 'common',
    attack: 1,
    defense: 1
  }),
].map(card => (
  {
    ...card,
    type: 'magic',
    unblockable: true,
    banishes: true
  }
));
