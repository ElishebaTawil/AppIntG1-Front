

import { REMOVE_FROM_CART } from './cartActionsTypes';

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId
  };
};
