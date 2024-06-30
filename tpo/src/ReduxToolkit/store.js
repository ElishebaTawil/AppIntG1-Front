import { configureStore} from '@reduxjs/toolkit';
import partyReducer from './partySlice';
import userReducer from './userSlice';
// import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    party: partyReducer,
    user: userReducer,
    // cart: cartReducer,
  },
});

export default store;
