const initialState = {
  yourName: 'Cat',
  yourImage: 'cat',
  yourStats: {
    attack: {
      permanent: 2,
      untilEndOfBattle: 0,
      untilEndOfTurn: 0
    },
    magic: {
      permanent: 0,
      untilEndOfBattle: 0,
      untilEndOfTurn: 0
    },
    defense: {
      permanent: 0,
      untilEndOfBattle: 0,
      untilEndOfTurn: 0
    }
  },
  yourShields: 0,

  enemyName: 'Sour Patch',
  enemyImage: 'sour_patch',
  enemyStats: {
    attack: {
      permanent: 2,
      untilEndOfBattle: 0,
      untilEndOfTurn: 0
    },
    magic: {
      permanent: 0,
      untilEndOfBattle: 0,
      untilEndOfTurn: 0
    },
    defense: {
      permanent: 0,
      untilEndOfBattle: 0,
      untilEndOfTurn: 0
    }
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
    default:
      return state;
  }
};
