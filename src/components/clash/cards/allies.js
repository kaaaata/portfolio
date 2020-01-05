import { createCard } from './utils';

export const allies = [
  createCard({
    name: 'Weapons Guy',
    image: 'weapons_guy',
    rarity: 'common',
    attack: 2,
    defense: 1,
    customEffect: true,
    description: 'Shuffle 3 random attacks into your draw pile.'
  }),
  createCard({
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    rarity: 'legendary',
    attack: 4,
    defense: 6,
    customEffect: true,
    description: 'Play a copy of Healing Blade. Shuffle 2 additional copies of Healing Blade into your draw pile.'
  }),
].map(card => (
  { ...card, type: 'ally' }
));
