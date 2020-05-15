import { cards, cardsByRarity } from '../cards/cards';
import { range, sample, random, shuffle } from 'lodash';

const dayBalancing = {
  1: { maxLegendaries: 0, maxRares: 0, maxUncommons: 0 },
  2: { maxLegendaries: 0, maxRares: 0, maxUncommons: 1 },
  3: { maxLegendaries: 0, maxRares: 1, maxUncommons: 2 },
  4: { maxLegendaries: 0, maxRares: 1, maxUncommons: 3 },
  5: { maxLegendaries: 0, maxRares: 2, maxUncommons: 4 },
  6: { maxLegendaries: 0, maxRares: 2, maxUncommons: 5 },
  7: { maxLegendaries: 1, maxRares: 3, maxUncommons: 6 },
  8: { maxLegendaries: 1, maxRares: 3, maxUncommons: 7 },
  9: { maxLegendaries: 2, maxRares: 4, maxUncommons: 8 },
  10: { maxLegendaries: 2, maxRares: 4, maxUncommons: 9 },
  11: { maxLegendaries: 2, maxRares: 5, maxUncommons: 10 },
  12: { maxLegendaries: 3, maxRares: 5, maxUncommons: 11 } // for tier 3 elite only
};

export const genMonsterDeck = (deck, tier, day, isElite) => {
  const deckSize = (10 + day * 5) + (isElite ? 10 * tier : 0);
  const deckByRarity = deck.map(card => cards[card].rarity);
  const { maxLegendaries, maxRares, maxUncommons } = dayBalancing[isElite ? day + 1 : tier];
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
