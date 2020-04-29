import { actionGenerators } from './actionGenerators';

// can't draw a card = lose.
// much easier to implement than "losing once your deck size reaches 0"
// also, it makes ties logically impossible.
export const isThereAWinner = (state, playerToDraw) => {
  const { logs, renderActions } = state;
  const isYourDeckEmpty = !state.you.deck.length;
  const isEnemyDeckEmpty = !state.enemy.deck.length;

  if (playerToDraw === 'you' && isYourDeckEmpty) {
    logs.push('enemy won!');
    renderActions.push([actionGenerators.setWinner(state, 'enemy')]);
    return true;
  } else if (playerToDraw === 'enemy' && isEnemyDeckEmpty) {
    logs.push('you won!');
    renderActions.push([actionGenerators.setWinner(state, 'you')]);
    return true;
  }

  return false;
};
