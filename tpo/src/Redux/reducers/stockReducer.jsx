// reducers/stockReducer.js

import all_parties from '../../Components/Assets/all_parties';

const initialState = {
  stock: all_parties.reduce((acc, item) => {
    acc[item.id] = item.stock; // Inicializa el stock de cada ítem con su valor inicial
    return acc;
  }, {})
};

const stockReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'AGREGAR_AL_CARRITO':
    case 'REDUCIR_STOCK':
      return {
        ...state,
        stock: {
          ...state.stock,
          [action.payload.itemId]: state.stock[action.payload.itemId] - action.payload.cantidad // Reduce el stock del ítem
        }
      };
    default:
      return state;
  }
};

export default stockReducer;
