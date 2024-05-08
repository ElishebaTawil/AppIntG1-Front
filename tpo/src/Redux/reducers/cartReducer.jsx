

import { REMOVE_FROM_CART } from './actionTypes';

const initialState = {
  cartItems: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
