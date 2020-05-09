const initialState = {
  scene: 'town'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        scene: action.payload
      };
    default:
      return state;
  }
};
