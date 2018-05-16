import { createStore, combineReducers } from 'redux';
import projects from './projects';

const initialState = {
  projects,
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
