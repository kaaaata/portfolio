import { actionGenerators } from './actionGenerators';
import { actions, logs } from './globalVariables';
import { cards } from '../cards/cards';

export const addCardCopiesIntoPiles = (copies, player) => {
  copies.forEach(({ card, pile }) => {
    actions.push([actionGenerators.addCardToStack({
      ...cards[card],
      player
    })]);
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
