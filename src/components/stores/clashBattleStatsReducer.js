const initialState = {
  yourName: '',
  yourImage: '',
  yourPermanentStats: { attack: 0, magic: 0, defense: 0 },
  yourTemporaryStats: { attack: 0, magic: 0, defense: 0 },
  yourShields: 0,

  enemyName: '',
  enemyImage: '',
  enemyPermanentStats: { attack: 0, magic: 0, defense: 0 },
  enemyTemporaryStats: { attack: 0, magic: 0, defense: 0 },
  enemyShields: 0,
  enemyLevel: 1,

  winner: null,
  winnerImage: ''
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
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload,
        winnerImage: action.payload === state.yourName ? state.yourImage : state.enemyImage
      };
    case 'SET_BATTLE_INITIAL_STATE':
      return {
        yourName: 'Spear Goon',
        yourImage: 'red_spear_guy',
        yourPermanentStats: action.payload.yourPermanentStats,
        yourTemporaryStats: { attack: 0, magic: 0, defense: 0 },
        yourShields: 0,
      
        enemyName: action.payload.enemyName,
        enemyImage: action.payload.enemyImage,
        enemyPermanentStats: { attack: 0, magic: 0, defense: 0 },
        enemyTemporaryStats: { attack: 0, magic: 0, defense: 0 },
        enemyShields: 0,
        enemyLevel: action.payload.enemyLevel,
      
        winner: null
      };
    default:
      return state;
  }
};
