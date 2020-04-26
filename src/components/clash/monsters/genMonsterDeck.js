import { cards, cardsByRarity } from '../cards/cards';
import { range, sample, shuffle } from 'lodash';

export const tierBalancing = {
  1: {
    averageDeckSize: 15,
    deckSizeVariance: 2,
    maxLegendaries: 0,
    maxRares: 0,
    maxUncommons: 1
  },
  2: {
    averageDeckSize: 30,
    deckSizeVariance: 4,
    maxLegendaries: 0,
    maxRares: 2,
    maxUncommons: 5
  },
  3: {
    averageDeckSize: 45,
    deckSizeVariance: 6,
    maxLegendaries: 1,
    maxRares: 5,
    maxUncommons: 10
  }
};

export const genMonsterDeck = (tier, deck) => {
  const deckByRarity = deck.map(card => cards[card].rarity);
  const { averageDeckSize, deckSizeVariance, maxLegendaries, maxRares, maxUncommons } = tierBalancing[tier];
  const cardsToAdd = {
    legendary: Math.max(0, maxLegendaries - deckByRarity.filter(card => card.rarity === 'legendary').length),
    rare: Math.max(0, maxRares - deckByRarity.filter(card => card.rarity === 'rare').length),
    uncommon: Math.max(0, maxUncommons - deckByRarity.filter(card => card.rarity === 'uncommon').length),
  };
  cardsToAdd.common = Math.max(
    0,
    averageDeckSize
      + sample(range(-1 * deckSizeVariance, deckSizeVariance + 1))
      - cardsToAdd.legendary
      - cardsToAdd.rare
      - cardsToAdd.uncommon
      - deck.length
  );

  return shuffle([
    ...deck,
    ...range(0, cardsToAdd.legendary).map(i => sample(cardsByRarity.legendary).name),
    ...range(0, cardsToAdd.rare).map(i => sample(cardsByRarity.rare).name),
    ...range(0, cardsToAdd.uncommon).map(i => sample(cardsByRarity.uncommon).name),
    ...range(0, cardsToAdd.common).map(i => sample(cardsByRarity.common).name)
  ]);
};
