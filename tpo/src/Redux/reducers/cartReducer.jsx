

const initialState = {
    items: {}, // Objeto que almacenará los ítems en el carrito, con el ID del ítem como clave y la cantidad como valor
  };
  
  const cartReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'AGREGAR_AL_CARRITO':
        return {
          ...state,
          items: {
            ...state.items,
            [action.payload.itemId]: (state.items[action.payload.itemId] || 0) + action.payload.cantidad // Agrega la cantidad seleccionada del ítem al carrito
          }
        };
      case 'ELIMINAR_DEL_CARRITO':
        const { [action.payload]: _, ...newItems } = state.items; // Elimina el ítem del carrito
        return {
          ...state,
          items: newItems
        };
      case 'VACIAR_CARRITO':
        return {
          ...state,
          items: {} // Vacía completamente el carrito
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  