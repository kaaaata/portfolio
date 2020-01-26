import { actionGenerators } from './actionGenerators';

export const genStartOfTurnActions = (stateCopy, actions, logs, player) => {
  logs.push(`${player}'s turn begins`);

  const startOfTurnActions = [actionGenerators.setShields(stateCopy, player, 0)];
  for (let i = 0; i < 3; i++) {
    if (!stateCopy[player].hand[i].name) {
      const cardToDraw = stateCopy[player].deck.getTopCard();
      startOfTurnActions.push(actionGenerators.removeCard(
        stateCopy,
        player,
        'deck',
        'top'
      ));
      startOfTurnActions.push(actionGenerators.addCard(
        stateCopy,
        cardToDraw,
        player,
        'hand',
        i
      ));
    }
  }

  actions.push(startOfTurnActions);
  actions.push([]);
};
