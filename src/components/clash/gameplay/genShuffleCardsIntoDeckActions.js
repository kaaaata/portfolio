import { actionGenerators } from './actionGenerators';

export const genShuffleCardsIntoDeckActions = (stateCopy, actions, logs, cards, player) => {
  cards.forEach(card => {
    actions.push([actionGenerators.addCardToStack(stateCopy, card)]);
  });

  actions.push([]);

  cards.forEach(card => {
    logs.push(`${player} shuffles card into deck: ${card.name}`);
    actions.push([
      actionGenerators.removeTopCardFromStack(stateCopy),
      actionGenerators.addCard(stateCopy, card, player, 'deck', 'random')
    ]);
  });
};
