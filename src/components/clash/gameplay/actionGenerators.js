import { actionKeys } from './actionKeys';
import { stateCopy } from './globalVariables';

export const actionGenerators = {
  // these functions mutate stateCopy and return actions.
  // "card" must be a new object, not a reference.
  addCardToStack: (card) => {
    const newCard = { ...card, location: 'stack' };
    stateCopy.stack.addCardToTop(newCard);
    return {
      actionKey: 'setStack',
      payload: stateCopy.stack.getCardNames()
    };
  },
  removeTopCardFromStack: () => {
    stateCopy.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: stateCopy.stack.getCardNames()
    };
  },
  addCard: (card, player, location, index) => {
    // index = number|'top'|'random'
    const newCard = {
      ...card,
      player,
      location
    };
    if (location === 'hand') {
      stateCopy[player][location][index] = newCard;
    } else if (index === 'top') {
      stateCopy[player][location].addCardToTop(newCard);
    } else if (index === 'random') {
      stateCopy[player][location].addCardAtRandomIndex(newCard);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: stateCopy[player][location].getCardNames()
    };
  },
  removeCard: (player, location, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return null;
    } else if (location === 'hand') {
      stateCopy[player][location][index] = {};
    } else if (index === 'top') {
      stateCopy[player][location].removeTopCard();
    } else {
      stateCopy[player][location].removeCardAtIndex(index);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: stateCopy[player][location].getCardNames()
    };
  },
  setShields: (player, value) => {
    stateCopy[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setTemporaryStats: (player, temporaryStatGain) => {
    // temporaryStatGain like { attack: 1, defense: 1 }
    Object.keys(temporaryStatGain).forEach(stat => {
      stateCopy[player].temporaryStats[stat] += temporaryStatGain[stat];
    });
    return {
      actionKey: actionKeys[player].temporaryStats,
      payload: stateCopy[player].temporaryStats
    };
  },
  setWinner: (player) => ({
    actionKey: 'setWinner',
    payload: stateCopy[player].name
  })
};
