import { genMonsterWaves } from '../clash/monsters/genMonsterWaves';;

const initialState = {
  energy: 12,
  day: 1,
  monsterWaves: genMonsterWaves(),
  canReceiveBlessing: false,
  canRecoverLoot: false,
  canFightElite: false,
  feed: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADJUST_PLAYER_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy + action.payload)
      };
    case 'START_NEW_DAY': {
      const newDay = state.day + 1;
      return {
        ...state,
        energy: 12,
        day: newDay,
        canReceiveBlessing: newDay % 4 === 0,
        canFightElite: newDay % 3 === 0 && newDay !== 12,
        feed: [
          newDay % 4 === 0 && 'A blessing is available today.',
          newDay % 3 === 0 && newDay !== 12 && 'An elite enemy approaches!'
        ].filter(Boolean)
      };
    }
    case 'ADD_TOWN_FEED_TEXT':
      return {
        ...state,
        feed: [...state.feed, action.payload]
      };
    case 'SET_CAN_RECEIVE_BLESSING_FALSE':
      return {
        ...state,
        canReceiveBlessing: false
      };
    case 'SET_CAN_RECOVER_LOOT':
      return {
        ...state,
        canRecoverLoot: action.payload
      };
    case 'SET_CAN_FIGHT_ELITE_FALSE':
      return {
        ...state,
        canFightElite: false
      };
    default:
      return state;
  }
};
