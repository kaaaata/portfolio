const initialState = {
  scene: 'town'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        scene: action.payload
      };
    case 'START_NEW_DAY':
      return {
        scene: 'town'
      };
    default:
      return state;
  }
};
