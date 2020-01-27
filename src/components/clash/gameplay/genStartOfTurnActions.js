import { actionGenerators } from './actionGenerators';
import { stateCopy, actions, logs } from './globalVariables';

export const genStartOfTurnActions = (player) => {
  logs.push(`${player}'s turn begins`);

  const startOfTurnActions = [actionGenerators.setShields(player, 0)];
  for (let i = 0; i < 3; i++) {
    if (!stateCopy[player].hand[i].name) {
      const cardToDraw = stateCopy[player].deck.getTopCard();
      startOfTurnActions.push(actionGenerators.removeCard(
        player,
        'deck',
        'top'
      ));
      startOfTurnActions.push(actionGenerators.addCard(
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
