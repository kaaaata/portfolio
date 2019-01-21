import { createStore } from 'redux';

const initialState = {
  isSidebarVisible: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_SIDEBAR_VISIBLE':
      return {
        ...state,
        isSidebarVisible: action.payload,
      };
    default:
      return state;
  }
};

export default createStore(reducer);
