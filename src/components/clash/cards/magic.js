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
    name: 'Candy Corn',
    image: 'candy_corn',
    rarity: 'uncommon',
    attack: 1,
    defense: 0,
    playCopiesOfCards: ['Candy Corn'],
    // description: 'Damage dealt banishes. Play a copy of Candy Corn.'
  }
].map(card => createCard({
  ...card,
  type: 'magic',
  dealsBanishingDamage: true
}));
