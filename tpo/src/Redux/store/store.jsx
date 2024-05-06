
import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';
import stockReducer from '../reducers/stockReducer';
import partyReducer from '../reducers/partyReducer'

// Combina los reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  stock: stockReducer,
  party: partyReducer
});

// Crea el store de Redux
const store = createStore(rootReducer);

export default store;
