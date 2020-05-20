import { genStartingDeck } from '../clash/cards/cards';

const initialState = {
  gold: 30,
  deck: genStartingDeck()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADJUST_PLAYER_GOLD':
      return {
        ...state,
        gold: Math.max(0, state.gold + action.payload)
      };
    case 'ADD_CARDS_TO_COLLECTION':
      return {
        ...state,
        deck: typeof action.payload === 'string'
          ? [action.payload, ...state.deck]
          : [...action.payload, ...state.deck]
      };
    case 'REMOVE_CARDS_FROM_COLLECTION': {
      const newDeck = [...state.deck];
      const removeCards = typeof action.payload === 'string'
        ? [action.payload]
        : action.payload;
      removeCards.forEach(card => {
        const spliceIndex = newDeck.indexOf(card);
        if (spliceIndex !== -1) {
          newDeck.splice(spliceIndex, 1);
        }
      });
      return {
        ...state,
        deck: newDeck
      };
    }
    default:
      return state;
  }
};
