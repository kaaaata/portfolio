import { genMonsterWaves } from '../clash/monsters/genMonsterWaves';
import { genRecruitableAllies } from '../clash/town/genRecruitableAllies';

const genInitialState = () => ({
  energy: 0,
  day: 4,
  monsterWaves: genMonsterWaves(),
  canRecoverLoot: false,
  canDoRandomEvent: true,
  recruitableAllies: genRecruitableAllies(),
  feed: [
    'Welcome to town!',
    'You are too tired from your long journey to do anything else today.'
  ]
});
const initialState = genInitialState();

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
        canDoRandomEvent: true,
        recruitableAllies: genRecruitableAllies(),
        feed: [
          'It\'s a new day.',
          action.payload.feedInitialMessage,
          [4, 8].includes(newDay) && 'Tonight, a boss enemy will attack!',
          newDay === 12 && 'Tonight, the final boss will attack!'
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
    case 'SET_CAN_RECOVER_LOOT':
      return {
        ...state,
        canRecoverLoot: action.payload
      };
    case 'SET_CAN_DO_RANDOM_EVENT_FALSE':
      return {
        ...state,
        canDoRandomEvent: false
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
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
