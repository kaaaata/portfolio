// coresite
export const setIsSidebarVisible = payload => ({ type: 'SET_IS_SIDEBAR_VISIBLE', payload });
export const setCurrentRoute = payload => ({ type: 'SET_CURRENT_ROUTE', payload });

// clash
export const setYourDeck = payload => ({ type: 'SET_YOUR_DECK', payload });
export const setYourDiscard = payload => ({ type: 'SET_YOUR_DISCARD', payload });
export const setYourBanish = payload => ({ type: 'SET_YOUR_BANISH', payload });
export const setYourHand = payload => ({ type: 'SET_YOUR_HAND', payload });
export const setEnemyDeck = payload => ({ type: 'SET_ENEMY_DECK', payload });
export const setEnemyDiscard = payload => ({ type: 'SET_ENEMY_DISCARD', payload });
export const setEnemyBanish = payload => ({ type: 'SET_ENEMY_BANISH', payload });
export const setEnemyHand = payload => ({ type: 'SET_ENEMY_HAND', payload });
export const setStack = payload => ({ type: 'SET_STACK', payload });
export const setYourShields = payload => ({ type: 'SET_YOUR_SHIELDS', payload });
export const setEnemyShields = payload => ({ type: 'SET_ENEMY_SHIELDS', payload });
export const setYourTemporaryStats = payload => ({ type: 'SET_YOUR_TEMPORARY_STATS', payload });
export const setEnemyTemporaryStats = payload => ({ type: 'SET_ENEMY_TEMPORARY_STATS', payload });
export const setBattleInitialState = payload => ({ type: 'SET_BATTLE_INITIAL_STATE', payload });
export const setWinner = payload => ({ type: 'SET_WINNER', payload });
export const setPlayerId = payload => ({ type: 'SET_PLAYER_ID', payload });
export const setMatchups = payload => ({ type: 'SET_MATCHUPS', payload });
export const setPlayerProperties = payload => ({ type: 'SET_PLAYER_PROPERTIES', payload });
export const setShopCards = payload => ({ type: 'SET_SHOP_CARDS', payload });
export const setAIMatchResults = payload => ({ type: 'SET_AI_MATCH_RESULTS', payload });
export const visitMapTile = payload => ({ type: 'VISIT_MAP_TILE', payload });
export const setMapEnergy = payload => ({ type: 'SET_MAP_ENERGY', payload });
