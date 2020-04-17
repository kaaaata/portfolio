const initialState = {
  yourDeck: [],
  yourDiscard: [],
  yourBanish: [],
  yourHand: [null, null, null],
  enemyDeck: [],
  enemyDiscard: [],
  enemyBanish: [],
  enemyHand: [null, null, null],
  stack: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YOUR_DECK':
      return {
        ...state,
        yourDeck: action.payload
      };
    case 'SET_YOUR_DISCARD':
      return {
        ...state,
        yourDiscard: action.payload
      };
    case 'SET_YOUR_BANISH':
      return {
        ...state,
        yourBanish: action.payload
      };
    case 'SET_YOUR_HAND':
      return {
        ...state,
        yourHand: action.payload
      };
    case 'SET_ENEMY_DECK':
      return {
        ...state,
        enemyDeck: action.payload
      };
    case 'SET_ENEMY_DISCARD':
      return {
        ...state,
        enemyDiscard: action.payload
      };
    case 'SET_ENEMY_BANISH':
      return {
        ...state,
        enemyBanish: action.payload
      };
    case 'SET_ENEMY_HAND':
      return {
        ...state,
        enemyHand: action.payload
      };
    case 'SET_STACK':
      return {
        ...state,
        stack: action.payload
      };
    case 'SET_BATTLE_INITIAL_STATE':
      return {
        yourDeck: [],
        yourDiscard: [],
        yourBanish: [],
        yourHand: [null, null, null],
        enemyDeck: [],
        enemyDiscard: [],
        enemyBanish: [],
        enemyHand: [null, null, null],
        stack: []
      };
    default:
      return state;
  }
};
