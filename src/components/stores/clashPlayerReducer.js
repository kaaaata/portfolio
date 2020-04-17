import { genStartingDeck } from '../clash/cards/cards';

const initialState = {
  name: 'Spear Goon',
  image: 'red_spear_guy',
  attack: 0,
  magic: 0,
  defense: 0,
  gold: 100,
  score: 0,
  deck: genStartingDeck()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_PROPERTIES':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
