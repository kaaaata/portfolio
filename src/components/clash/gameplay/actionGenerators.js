import { actionKeys } from './actionKeys';

export const actionGenerators = {
  // these functions mutate stateCopy and return actions.
  // "card" must be a new object, not a reference.
  // each function should use stateCopy as the first arg.
  addCardToStack: (stateCopy, card) => {
    const newCard = { ...card, location: 'stack' };
    stateCopy.stack.addCardToTop(newCard);
    return {
      actionKey: 'setStack',
      payload: stateCopy.stack.getCardNames()
    };
  },
  removeTopCardFromStack: (stateCopy) => {
    stateCopy.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: stateCopy.stack.getCardNames()
    };
  },
  addCard: (stateCopy, card, player, location, index) => {
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
  removeCard: (stateCopy, player, location, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return;
    } else if (location === 'hand') {
      stateCopy[player][location][index] = {};
    } else if (index === 'top') {
      stateCopy[player][location].removeTopCard();
    }
    return {
      actionKey: actionKeys[player][location],
      payload: stateCopy[player][location].getCardNames()
    };
  },
  setShields: (stateCopy, player, value) => {
    stateCopy[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setTemporaryStats: (stateCopy, player, temporaryStatGain) => {
    // temporaryStatGain like { attack: 1, defense: 1 }
    Object.keys(temporaryStatGain).forEach(stat => {
      stateCopy[player].temporaryStats[stat] += temporaryStatGain[stat];
    });
    return {
      actionKey: actionKeys[player].temporaryStats,
      payload: stateCopy[player].temporaryStats
    };
  },
  setWinner: (stateCopy, player) => {
    stateCopy.winner = stateCopy[player].name;
    return {
      actionKey: 'setWinner',
      payload: stateCopy[player].name
    };
  }
};
