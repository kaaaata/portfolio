import { cards, cardsByRarity } from '../cards/cards';
import { range, sample, random, shuffle } from 'lodash';

export const tierBalancing = {
  1: { // deck size: 10, 15, 20, 25
    maxLegendaries: 0,
    maxRares: 1,
    maxUncommons: 1
  },
  2: { // deck size: 30, 35, 40, 45
    maxLegendaries: 0,
    maxRares: 3,
    maxUncommons: 6
  },
  3: { // deck size: 50, 55, 60, 65
    maxLegendaries: 1,
    maxRares: 5,
    maxUncommons: 10
  }
};

export const genMonsterDeck = (deck, tier, day) => {
  const deckSize = (day + 1) * 5;
  const deckByRarity = deck.map(card => cards[card].rarity);
  const { maxLegendaries, maxRares, maxUncommons } = tierBalancing[tier];
  const cardsToAdd = {
    legendary: Math.max(0, maxLegendaries - deckByRarity.filter(card => card.rarity === 'legendary').length),
    rare: Math.max(0, maxRares - deckByRarity.filter(card => card.rarity === 'rare').length),
    uncommon: Math.max(0, maxUncommons - deckByRarity.filter(card => card.rarity === 'uncommon').length),
  };
  cardsToAdd.common = Math.max(0, deckSize
    + random(-2, 2)
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
