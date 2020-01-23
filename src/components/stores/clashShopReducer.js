import { genShopCards } from '../clash/cards/cards';

const initialState = {
  cards: genShopCards()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOP_CARDS':
      return {
        ...state,
        cards: action.payload
      };
    default:
      return state;
  }
};
