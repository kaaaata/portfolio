import { createCard } from './utils';

export const allies = [
  // createCard({
  //   name: 'Weapons Guy',
  //   image: 'weapons_guy',
  //   rarity: 'common',
  //   attack: 2,
  //   defense: 1,
  //   fetchCards: [{
  //     origin: null,
  //     destination: 'deck',
  //     filterFunc: (card) => card.type === 'attack'
  //   }],
  //   description: 'Add 3 random attacks into your draw pile.'
  // }),
].map(card => (
  { ...card, type: 'ally' }
));
