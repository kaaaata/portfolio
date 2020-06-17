import { allies } from '../cards/allies';
import { sample, random } from 'lodash';

export const genRecruitableAllies = () => {
  const rolledLegendaryAlly = Math.random() < 0.1;

  const recruitableAllies = [
    {
      name: sample(allies.filter(card => card.rarity === 'common')).name,
      cost: 0
    },
    {
      name: sample(allies.filter(card => card.rarity === 'uncommon')).name,
      cost: 30 + random(-10, 10)
    }
  ];

  if (rolledLegendaryAlly) {
    recruitableAllies.push({
      name: sample(allies.filter(card => card.rarity === 'legendary')).name,
      cost: 120 + random(-30, 30)
    });
  } else {
    recruitableAllies.push({
      name: sample(allies.filter(card => card.rarity === 'rare')).name,
      cost: 70 + random(-20, 20)
    });
  }

  return recruitableAllies;
};
