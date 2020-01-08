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
].map(card => createCard({
  ...card,
  type: 'magic',
  unblockable: true,
  dealsBanishingDamage: true
}));
