import { genMonsterWaves } from '../clash/monsters/genMonsterWaves';
import { genRecruitableAllies } from '../clash/town/genRecruitableAllies';
  
const initialState = {
  energy: 12,
  day: 1,
  monsterWaves: genMonsterWaves(),
  canReceiveBlessing: false,
  canRecoverLoot: false,
  canFightElite: false,
  canDrinkPotion: true,
  recruitableAllies: genRecruitableAllies(),
  feed: ['Welcome to town!']
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADJUST_PLAYER_ENERGY':
      return {
        ...state,
        energy: Math.max(0, Math.min(12, state.energy + action.payload))
      };
    case 'START_NEW_DAY': {
      const newDay = state.day + 1;
      return {
        ...state,
        energy: 12,
        day: newDay,
        canReceiveBlessing: newDay % 4 === 0,
        canFightElite: newDay % 3 === 0 && newDay !== 12,
        canDrinkPotion: true,
        recruitableAllies: genRecruitableAllies(),
        feed: [
          'It\'s a new day.',
          action.payload.feedInitialMessage,
          newDay % 4 === 0 && 'A blessing is available today.',
          newDay % 3 === 0 && newDay !== 12 && 'An elite enemy approaches!'
        ].filter(Boolean)
      };
    }
    case 'ADD_TOWN_FEED_TEXT': {
      const newFeed = [...state.feed];
      if (typeof action.payload === 'string') {
        newFeed.push(action.payload);
      } else {
        action.payload.forEach(text => {
          newFeed.push(text);
        });
      }
      return {
        ...state,
        feed: newFeed
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
    case 'SET_CAN_DRINK_POTION_FALSE':
      return {
        ...state,
        canDrinkPotion: false
      };
    case 'SET_RECRUITABLE_ALLY_PURCHASED': {
      const purchasedIndex = action.payload;
      const newRecruitableAlly = {
        ...state.recruitableAllies[purchasedIndex],
        isPurchased: true
      };
      const newRecruitableAllies = [...state.recruitableAllies];
      newRecruitableAllies[purchasedIndex] = newRecruitableAlly;
      return {
        ...state,
        recruitableAllies: newRecruitableAllies
      };
    }
    default:
      return state;
  }
};
