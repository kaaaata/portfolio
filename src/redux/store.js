import { createStore, combineReducers } from 'redux';
import projects from './projects';
import skills from './skills';

const initialState = {
  projects,
  skills,
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
