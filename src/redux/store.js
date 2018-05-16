import { createStore, combineReducers } from 'redux';

const initialState = {
  // player: {
  //   name: '',
  // },
  // game: {},
  // games: [],
};

const reducers = {
  default: (state = initialState, action) => {
    switch (action.type) {
      // case 'set_player':
      //   // set active player
      //   return { ...state, 
      //     player: action.payload,
      //   };
      default:
        return state;
    }
  },
};

export default createStore(combineReducers(reducers));
