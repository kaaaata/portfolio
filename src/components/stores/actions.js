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
