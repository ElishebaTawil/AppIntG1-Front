


export const agregarAlCarrito = (itemId) => {
    return {
      type: 'AGREGAR_AL_CARRITO',
      payload: itemId
    };
  };
  
 
  export const eliminarDelCarrito = (itemId) => {
    return {
      type: 'ELIMINAR_DEL_CARRITO',
      payload: itemId
    };
  };
  
 
  export const vaciarCarrito = () => {
    return {
      type: 'VACIAR_CARRITO'
    };
  };
  
 
  export const reducirStock = (itemId, cantidad) => {
    return {
      type: 'REDUCIR_STOCK',
      payload: { itemId, cantidad }
    };
  };
  