const initialState = {
  scene: 'town',
  canVisitShop: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        scene: action.payload
      };
    case 'START_NEW_DAY':
      return {
        ...state,
        scene: 'town'
      };
    case 'SET_CAN_VISIT_SHOP':
      return {
        ...state,
        canVisitShop: action.payload
      };
    default:
      return state;
  }
};
