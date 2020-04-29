import { actionKeys } from './actionKeys';

export const actionGenerators = {
  // these functions mutate state and return actions.
  addCardToStack: (state, card) => {
    state.stack.addCardToTop(card);
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardNames()
    };
  },
  removeTopCardFromStack: (state) => {
    state.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardNames()
    };
  },
  addCard: (state, card, player, location, index) => {
    // index = number|'top'|'random'
    if (location === 'hand') {
      state[player][location][index] = card;
    } else if (index === 'top') {
      state[player][location].addCardToTop(card);
    } else if (index === 'random') {
      state[player][location].addCardAtRandomIndex(card);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: state[player][location].getCardNames()
    };
  },
  removeCard: (state, player, location, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return null;
    } else if (location === 'hand') {
      state[player][location][index] = {};
    } else if (index === 'top') {
      state[player][location].removeTopCard();
    } else {
      state[player][location].removeCardAtIndex(index);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: state[player][location].getCardNames()
    };
  },
  setShields: (state, player, value) => {
    state[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setTemporaryStats: (state, player, temporaryStatGain) => {
    // temporaryStatGain like { attack: 1, defense: 1 }
    Object.keys(temporaryStatGain).forEach(stat => {
      state[player].temporaryStats[stat] += temporaryStatGain[stat];
    });
    return {
      actionKey: actionKeys[player].temporaryStats,
      payload: state[player].temporaryStats
    };
  },
  setWinner: (state, player) => ({
    actionKey: 'setWinner',
    payload: state[player].name
  })
};
