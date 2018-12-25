import { createStore } from 'redux';

const initialState = {
  test: 'i am a test!'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: action.payload,
      };
    default:
      return state;
  }
};

export default createStore(reducer);
