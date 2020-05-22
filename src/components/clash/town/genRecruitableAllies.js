import { allies } from '../cards/allies';
import { sample, random } from 'lodash';

export const genRecruitableAllies = () => {
  const rolledLegendaryAlly = Math.random() < 0.1;

  const recruitableAllies = [
    {
      name: sample(allies.filter(card => card.rarity === 'common')).name,
      isPurchased: false,
      cost: 30 + random(-10, 10)
    },
    {
      name: sample(allies.filter(card => card.rarity === 'uncommon')).name,
      isPurchased: false,
      cost: 70 + random(-20, 20)
    }
  ];

  if (rolledLegendaryAlly) {
    recruitableAllies.push({
      name: sample(allies.filter(card => card.rarity === 'legendary')).name,
      isPurchased: false,
      cost: 200 + random(-40, 40)
    });
  } else {
    recruitableAllies.push({
      name: sample(allies.filter(card => card.rarity === 'rare')).name,
      isPurchased: false,
      cost: 120 + random(-30, 30)
    });
  }

  return recruitableAllies;
};
