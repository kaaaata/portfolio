import { cardsByRarity } from '../cards/cards';
import { rarityScore, upgradeRarity } from '../cards/rarity';
import { sample } from 'lodash';

export const genPackCards = (pack) => {
  const { cards, rarityCap } = pack;

  const packCards = [];

  Object.keys(cards).reverse().forEach(rarity => {
    for (let i = 0; i < cards[rarity]; i++) {
      packCards.push(sample(cardsByRarity[rarity]));
    }
  });

  for (let i = 0; i < cards.length; i++) {
    if (rarityScore[cards[i].rarity] < rarityScore[rarityCap] && Math.random() < 0.1) {
      packCards[i] = sample(cardsByRarity[upgradeRarity(cards[i].rarity)]);
      i--;
    }
  }

  return packCards.map(card => card.name);
};
