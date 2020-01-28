import { actionGenerators } from './actionGenerators';
import { actions, logs } from './globalVariables';
import { cards } from '../cards/cards';

export const addCardCopiesIntoPiles = (copies, player, removeCardArgs) => {
  copies.forEach(({ card }) => {
    const action = [
      actionGenerators.addCardToStack({
        ...cards[card],
        player
      })
    ];
    if (removeCardArgs) {
      action.push(actionGenerators.removeCard(
        removeCardArgs.player,
        removeCardArgs.location,
        removeCardArgs.index
      ));
    }
    actions.push(action);
  });

  actions.push([]);

  copies.forEach(({ card, pile, index = 'random' }) => {
    logs.push(`${player} shuffles card into their ${pile}: ${card}`);
    actions.push([
      actionGenerators.removeTopCardFromStack(),
      actionGenerators.addCard(
        cards[card],
        player,
        pile,
        index
      )
    ]);
  });
};
