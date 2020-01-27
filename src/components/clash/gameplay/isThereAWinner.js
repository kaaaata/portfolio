import { stateCopy, actions, logs } from './globalVariables';
import { actionGenerators } from './actionGenerators';

// can't draw a card = lose.
// much easier to implement than "losing once your deck size reaches 0"
// also, ties are logically impossible.
export const isThereAWinner = (playerToDraw) => {
  const isYourDeckEmpty = !stateCopy.you.deck.length;
  const isEnemyDeckEmpty = !stateCopy.enemy.deck.length;

  if (playerToDraw === 'you' && isYourDeckEmpty) {
    logs.push('enemy won!');
    actions.push([actionGenerators.setWinner('enemy')]);
    return true;
  } else if (playerToDraw === 'enemy' && isEnemyDeckEmpty) {
    logs.push('you won!');
    actions.push([actionGenerators.setWinner('you')]);
    return true;
  }

  return false;
};
