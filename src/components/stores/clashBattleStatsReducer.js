const initialState = {
  yourName: 'Lyra the Blue',
  yourImage: 'mermaid',
  yourPermanentStats: {
    attack: 0,
    magic: 0,
    defense: 0
  },
  yourTemporaryStats: {
    attack: 0,
    magic: 0,
    defense: 0
  },
  yourShields: 0,

  enemyName: 'Jolo the Goon',
  enemyImage: 'red_spear_guy',
  enemyPermanentStats: {
    attack: 0,
    magic: 0,
    defense: 0
  },
  enemyTemporaryStats: {
    attack: 0,
    magic: 0,
    defense: 0
  },
  enemyShields: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YOUR_SHIELDS':
      return {
        ...state,
        yourShields: action.payload
      };
    case 'SET_ENEMY_SHIELDS':
      return {
        ...state,
        enemyShields: action.payload
      };
    case 'SET_YOUR_TEMPORARY_STATS':
      return {
        ...state,
        yourTemporaryStats: {
          ...state.yourTemporaryStats,
          ...action.payload
        }
      };
    case 'SET_ENEMY_TEMPORARY_STATS':
      return {
        ...state,
        enemyTemporaryStats: {
          ...state.enemyTemporaryStats,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
