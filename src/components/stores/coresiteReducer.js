const initialState = {
  currentRoute: {
    pathname: '/',
    hash: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: action.payload,
      };
    default:
      return state;
  }
};
