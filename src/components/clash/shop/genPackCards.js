import { cardsByRarity } from '../cards/cards';
import { upgradeRarity } from '../cards/rarity';
import { sample } from 'lodash';

export const genPackCards = (pack) => {
  const { cards } = pack;
  const packCards = [];

  Object.keys(cards).forEach(rarity => {
    for (let i = 0; i < cards[rarity]; i++) {
      if (rarity === 'common' && Math.random() < 0.05) {
        packCards.unshift('Strange Key');
      } else {
        packCards.unshift(sample(cardsByRarity[rarity]).name);
      }
    }
  });

  for (let i = 0; i < packCards.length; i++) {
    if (Math.random() < 0.05) {
      packCards[i] = sample(cardsByRarity[upgradeRarity(packCards[i].rarity)]).name;
      i--;
    }
  }

  return packCards;
};
