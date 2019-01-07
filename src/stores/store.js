import { createStore } from 'redux';

const initialState = {
  documentTitle: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DOCUMENT_TITLE':
      return {
        ...state,
        documentTitle: action.payload,
      };
    default:
      return state;
  }
};

export default createStore(reducer);
