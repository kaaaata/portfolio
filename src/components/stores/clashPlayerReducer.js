import { genStartingDeck } from '../clash/cards/cards';

const initialState = {
  name: 'Spear Goon',
  image: 'red_spear_guy',
  attack: 0,
  magic: 0,
  defense: 0,
  gold: 100,
  energy: 12,
  deck: genStartingDeck()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_PROPERTIES':
      return {
        ...state,
        ...action.payload
      };
    case 'ADJUST_PLAYER_STATS':
      return {
        ...state,
        attack: Math.max(0, state.attack + action.payload.attack),
        magic: Math.max(0, state.magic + action.payload.magic),
        defense: Math.max(0, state.defense + action.payload.defense),
      };
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
    case 'ADJUST_PLAYER_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy + action.payload)
      };
    default:
      return state;
  }
};
