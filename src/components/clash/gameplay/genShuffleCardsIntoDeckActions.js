import { actionGenerators } from './actionGenerators';

export const genShuffleCardsIntoDeckActions = (stateCopy, actions, cards, player) => {
  cards.forEach(card => {
    actions.push([actionGenerators.addCardToStack(stateCopy, card)]);
  });

  actions.push([]);

  cards.forEach(card => {
    actions.push([
      actionGenerators.removeTopCardFromStack(stateCopy),
      actionGenerators.addCard(stateCopy, card, player, 'deck', 'random')
    ]);
  });
};
