import { createStore, combineReducers } from 'redux';
import coresiteReducer from './coresiteReducer';
import clashBattleCardsReducer from './clashBattleCardsReducer';
import clashBattleStatsReducer from './clashBattleStatsReducer';
import clashPlayerReducer from './clashPlayerReducer';
import clashMapReducer from './clashMapReducer';
import clashSceneReducer from './clashSceneReducer';

export const store = createStore(combineReducers({
  coresite: coresiteReducer,
  clashBattleCards: clashBattleCardsReducer,
  clashBattleStats: clashBattleStatsReducer,
  clashPlayer: clashPlayerReducer,
  clashMap: clashMapReducer,
  clashScene: clashSceneReducer
}));
