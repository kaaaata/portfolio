const initialState = {
  yourDeck: [],
  yourDiscard: [...Array(16).fill('Strike')],
  yourBanish: [],
  yourHand: ['Catherine the Great', 'Weapons Guy', 'Slice'],
  enemyDeck: [...Array(2).fill('Strike')],
  enemyDiscard: [],
  enemyBanish: [],
  enemyHand: [...Array(3).fill('Fire')],
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
    default:
      return state;
  }
};
