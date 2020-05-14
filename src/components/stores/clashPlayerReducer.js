import { genStartingDeck } from '../clash/cards/cards';

const initialState = {
  gold: 100,
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
        deck: [...state.deck, ...action.payload]
      };
    default:
      return state;
  }
};
