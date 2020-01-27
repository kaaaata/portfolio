import { actionGenerators } from './actionGenerators';
import { actions, logs } from './globalVariables';

export const genShuffleCardsIntoDeckActions = (cards, player) => {
  cards.forEach(card => {
    actions.push([actionGenerators.addCardToStack(card)]);
  });

  actions.push([]);

  cards.forEach(card => {
    logs.push(`${player} shuffles card into deck: ${card.name}`);
    actions.push([
      actionGenerators.removeTopCardFromStack(),
      actionGenerators.addCard(card, player, 'deck', 'random')
    ]);
  });
};
