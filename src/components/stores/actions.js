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
export const setBattleRewardCards = payload => ({ type: 'SET_BATTLE_REWARD_CARDS', payload });
export const setBattleRewardGold = payload => ({ type: 'SET_BATTLE_REWARD_GOLD', payload });

export const setEnemy = payload => ({ type: 'SET_ENEMY', payload });
export const setYourShields = payload => ({ type: 'SET_YOUR_SHIELDS', payload });
export const setEnemyShields = payload => ({ type: 'SET_ENEMY_SHIELDS', payload });
export const setStats = payload => ({ type: 'SET_STATS', payload });
export const setBattleInitialState = payload => ({ type: 'SET_BATTLE_INITIAL_STATE', payload });
export const setWinner = payload => ({ type: 'SET_WINNER', payload });

export const adjustPlayerGold = payload => ({ type: 'ADJUST_PLAYER_GOLD', payload });
export const adjustPlayerEnergy = payload => ({ type: 'ADJUST_PLAYER_ENERGY', payload });
export const addCardsToCollection = payload => ({ type: 'ADD_CARDS_TO_COLLECTION', payload });

export const setScene = payload => ({ type: 'SET_SCENE', payload });
export const startNewDay = payload => ({ type: 'START_NEW_DAY', payload });
