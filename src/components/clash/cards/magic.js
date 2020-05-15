import { createCard } from './createCard';

export const magic = [
  {
    name: 'Fire',
    image: 'fire',
    rarity: 'common',
    attack: 2,
    defense: 0
  },
  {
    name: 'Tentacles',
    image: 'tentacles',
    rarity: 'common',
    attack: 1,
    defense: 1
  },
  {
    name: 'Magic Scroll',
    image: 'scroll',
    rarity: 'common',
    attack: 0,
    defense: 0,
    customEffect: true,
    description: 'Play a copy of a random non-legendary card.'
  },
  {
    name: 'Candy Corn',
    image: 'candy_corn',
    rarity: 'uncommon',
    attack: 3,
    defense: 0,
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Candy Corn', pile: 'discard', index: 'top' },
      { card: 'Candy Corn', pile: 'discard', index: 'top' }
    ],
    description: 'Damage dealt pierces shields. Add two copies of Candy Corn into your discard.'
  },
].map(card => createCard({
  ...card,
  type: 'magic',
  pierces: true
}));
