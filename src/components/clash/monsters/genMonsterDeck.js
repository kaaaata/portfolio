import { cards, lootableCardPool } from '../cards/cards';
import { range, sample, random, shuffle } from 'lodash';

const dayBalancing = {
  1: { deckSize: 10, maxLegendaries: 0, maxRares: 0, maxUncommons: 0 },
  2: { deckSize: 15, maxLegendaries: 0, maxRares: 0, maxUncommons: 1 },
  3: { deckSize: 20, maxLegendaries: 0, maxRares: 0, maxUncommons: 2 },
  4: { deckSize: 25, maxLegendaries: 0, maxRares: 1, maxUncommons: 3 }, // boss
  5: { deckSize: 30, maxLegendaries: 0, maxRares: 1, maxUncommons: 4 },
  6: { deckSize: 35, maxLegendaries: 0, maxRares: 1, maxUncommons: 5 },
  7: { deckSize: 40, maxLegendaries: 0, maxRares: 1, maxUncommons: 6 },
  8: { deckSize: 45, maxLegendaries: 1, maxRares: 2, maxUncommons: 7 }, // boss
  9: { deckSize: 50, maxLegendaries: 1, maxRares: 2, maxUncommons: 8 },
  10: { deckSize: 55, maxLegendaries: 1, maxRares: 2, maxUncommons: 9 },
  11: { deckSize: 60, maxLegendaries: 1, maxRares: 2, maxUncommons: 10 },
  12: { deckSize: 75, maxLegendaries: 2, maxRares: 3, maxUncommons: 11 } // final boss
};

export const genMonsterDeck = (deck, day) => {
  const deckByRarity = deck.map(card => cards[card].rarity);
  const { maxLegendaries, maxRares, maxUncommons, deckSize } = dayBalancing[day];
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
    ...range(0, cardsToAdd.legendary).map(i => sample(lootableCardPool.legendary)),
    ...range(0, cardsToAdd.rare).map(i => sample(lootableCardPool.rare)),
    ...range(0, cardsToAdd.uncommon).map(i => sample(lootableCardPool.uncommon)),
    ...range(0, cardsToAdd.common).map(i => sample(lootableCardPool.common))
  ]);
};
