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
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Candy Corn', pile: 'discard', index: 'top' },
      { card: 'Candy Corn', pile: 'discard', index: 'top' }
    ],
    description: 'Damage dealt banishes. Add two copies of Candy Corn into your discard.'
  }
].map(card => createCard({
  ...card,
  type: 'magic',
  dealsBanishingDamage: true
}));
