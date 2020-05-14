import { genMonsterWaves } from '../clash/monsters/genMonsterWaves';;

const initialState = {
  energy: 12,
  day: 3,
  monsterWaves: genMonsterWaves(),
  canReceiveBlessing: false,
  canRecoverLoot: false,
  canFightElite: false
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
        canFightElite: newDay % 3 === 0 && newDay !== 12
      };
    }
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
