const initialState = {
  isSidebarVisible: false,
  currentRoute: {
    pathname: '/',
    hash: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_SIDEBAR_VISIBLE':
      return {
        ...state,
        isSidebarVisible: action.payload,
      };
    case 'SET_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: action.payload,
      };
    default:
      return state;
  }
};
