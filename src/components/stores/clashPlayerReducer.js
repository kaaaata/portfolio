import { genStartingDeck } from '../clash/cards/cards';
import { genMonsterWaves } from '../clash/monsters/genMonsterWaves';;

const initialState = {
  gold: 100,
  energy: 12,
  deck: genStartingDeck(),
  day: 3,
  monsterWaves: genMonsterWaves()
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
    case 'ADJUST_PLAYER_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy + action.payload)
      };
    case 'START_NEW_DAY':
      return {
        ...state,
        energy: 12,
        day: state.day + 1
      };
    default:
      return state;
  }
};
