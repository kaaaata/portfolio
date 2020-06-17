import { attacks } from '../cards/attacks';
import { magic } from '../cards/magic';
import { potions } from '../cards/potions';
import { allies } from '../cards/allies';
import { sample, random } from 'lodash';

const cards = {
  attacks: attacks.filter(card => !card.isToken || card.name === 'Strange Key'),
  magic: magic.filter(card => !card.isToken),
  potions: potions.filter(card => !card.isToken),
  allies: allies.filter(card => !card.isToken)
};

export const genPurchasableCards = (type) => {
  const rolledLegendaryCard = Math.random() < 0.1;

  const purchasableCards = [
    {
      name: (sample(cards[type].filter(card => card.rarity === 'common')) || {}).name,
      cost: 0
    },
    {
      name: (sample(cards[type].filter(card => card.rarity === 'uncommon')) || {}).name,
      cost: 30 + random(-10, 10)
    }
  ];

  if (rolledLegendaryCard) {
    purchasableCards.push({
      name: (sample(cards[type].filter(card => card.rarity === 'legendary')) || {}).name,
      cost: 120 + random(-30, 30)
    });
  } else {
    purchasableCards.push({
      name: (sample(cards[type].filter(card => card.rarity === 'rare')) || {}).name,
      cost: 70 + random(-20, 20)
    });
  }

  return purchasableCards.filter(card => card.name);
};
