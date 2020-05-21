const initialState = {
  toast: '',
  flipper: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOAST':
      return {
        ...state,
        toast: action.payload,
        flipper: !state.flipper
      };
    case 'ADJUST_PLAYER_GOLD':
      return {
        ...state,
        toast: `${action.payload > 0 ? 'Received' : 'Lost'}: ${Math.abs(action.payload)} gold`,
        flipper: !state.flipper
      };
    case 'ADD_CARDS_TO_COLLECTION': {
      const cards = typeof action.payload === 'string' ? [action.payload] : action.payload;
      return {
        ...state,
        toast: `Received ${cards.length === 1 ? 'card' : 'cards'}: ${cards.join(', ')}`,
        flipper: !state.flipper
      };
    }
    case 'REMOVE_CARDS_FROM_COLLECTION': {
      const cards = typeof action.payload === 'string' ? [action.payload] : action.payload;
      return {
        ...state,
        toast: `Lost ${cards.length === 1 ? 'card' : 'cards'}: ${cards.join(', ')}`,
        flipper: !state.flipper
      };
    }
    default:
      return state;
  }
};
