import { createStore, combineReducers } from 'redux';
import coresiteReducer from './coresiteReducer';
import clashBattleCardsReducer from './clashBattleCardsReducer';
import clashBattleStatsReducer from './clashBattleStatsReducer';
import clashPlayersReducer from './clashPlayersReducer';
import clashShopReducer from './clashShopReducer';

export const store = createStore(combineReducers({
  coresite: coresiteReducer,
  clashBattleCards: clashBattleCardsReducer,
  clashBattleStats: clashBattleStatsReducer,
  clashPlayers: clashPlayersReducer,
  clashShop: clashShopReducer
}));
