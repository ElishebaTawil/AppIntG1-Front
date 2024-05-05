import React, { createContext } from "react";
import all_parties from "../Components/Assets/all_parties";
import { useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (allParties) => {
  let cart = {};
  for (let index = 0; index < allParties.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [allParties, setAllParties] = useState(all_parties);
  const [cartItems, setCartItems] = useState(getDefaultCart(allParties));
  const [shoppingCart, setShoppingCart] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({ name: "", role: "", isLogged: false });
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const addToCart = (itemId, cantidad) => {
    if (user.isLogged) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + cantidad }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const removeAllFromCart = () => {
    setCartItems(() => ({}));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_parties.find((party) => party.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount; // Move return statement outside of the loop
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems; // Move return statement outside of the loop
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
