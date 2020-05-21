import { createStore, combineReducers } from 'redux';
import coresiteReducer from './coresiteReducer';
import clashBattleCardsReducer from './clashBattleCardsReducer';
import clashBattleStatsReducer from './clashBattleStatsReducer';
import clashPlayerReducer from './clashPlayerReducer';
import clashTownReducer from './clashTownReducer';
import clashSceneReducer from './clashSceneReducer';
import clashToastReducer from './clashToastReducer';

export const store = createStore(combineReducers({
  coresite: coresiteReducer,
  clashBattleCards: clashBattleCardsReducer,
  clashBattleStats: clashBattleStatsReducer,
  clashPlayer: clashPlayerReducer,
  clashTown: clashTownReducer,
  clashScene: clashSceneReducer,
  clashToast: clashToastReducer
}));
