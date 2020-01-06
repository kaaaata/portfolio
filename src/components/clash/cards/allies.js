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
  createCard({
    name: 'Lyra the Blue',
    image: 'mermaid',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    heal: 4,
    healEnemy: 2
  }),
  createCard({
    name: 'Jolo the Goon',
    image: 'red_spear_guy',
    rarity: 'uncommon',
    attack: 1,
    defense: 3,
    customEffect: true,
    pierce: 1,
    description: 'Pierce: 1. Shuffle a copy of Jolo the Goon into your draw pile.'
  }),
  createCard({
    name: 'Wayne',
    image: 'goblin',
    rarity: 'common',
    attack: 2,
    defense: 0,
    customEffect: true,
    description: 'Shuffle 2 copies of Bomb into your opponent\'s draw pile.'
  })
].map(card => (
  { ...card, type: 'ally' }
));
