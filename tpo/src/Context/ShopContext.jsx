import React, { createContext } from "react";
import all_parties from "../Components/Assets/all_parties";
import { useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allParties, setAllParties] = useState(all_parties);
  const [cartItems, setCartItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({ name: "", role: "", isLogged: false });
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const addToCart = (evento, cantidad) => {
    if (user.isLogged) {
      const item = cartItems.find((item) => item.id === evento.id);

      if (item) {
        const nuevaCantidad = item.cantidad + cantidad;
        const nuevoCart = [
          ...cartItems.filter((item) => item.id !== evento.id),
          { ...evento, cantidad: nuevaCantidad },
        ];
        setCartItems(nuevoCart);
      } else {
        setCartItems((cartItems) => [...cartItems, { ...evento, cantidad }]);
      }
    }
  };

  const removeFromCart = (itemId) => {
    //excluyo al item con el id que no quiero
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const removeAllFromCart = () => {
    setCartItems(() => ({}));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.new_price * item.cantidad;
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return cartItems.length;
  };

  const descountStockParty = (itemId, cantidad) => {
    setAllParties((prevParties) => {
      return prevParties.map((party) => {
        if (party.id === itemId) {
          return {
            ...party,
            stock: party.stock - cantidad,
          };
        }
        return party;
      });
    });
  };

  const agregarParty = (party) => {
    setAllParties(() => [...allParties, party]);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    allParties,
    agregarParty,
    cartItems,
    addToCart,
    removeFromCart,
    shoppingCart,
    setShoppingCart,
    search,
    setSearch,
    user,
    setUser,
    cantidadSeleccionada,
    setCantidadSeleccionada,
    descountStockParty,
    removeAllFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
