import React, { createContext } from "react";
import all_parties from "../Components/Assets/all_parties";
import { useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_parties.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [shoppingCart, setShoppingCart] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({ name: "", role: "", isLogged: false });
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState(all_parties);
  const [party, setParty] = useState({
    id: 0,
    name: "",
    image: "",
    price: 0,
    category: "",
    fecha: "",
    hora: "00:00",
    lugar: "",
    ubicacion: "",
    cantEntradas: 0,
    descripcion: "",
  }); //parametros de la fiesta

  const addToCart = (itemId, cantidad) => {
    if (user.isLogged) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + cantidad }));
      console.log(cartItems);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const removeAllFromCart = () => {
    setCartItems(() => ({}));
  }

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
    setAllParties(prevParties => {
        return prevParties.map(party => {
            if (party.id === itemId) {
              console.log('siii')
                return {
                    ...party,
                    stock: party.stock - cantidad
                };
            }
            return party;
        });
    });
};


  const agregarParty = (party) => {
    setParties((all_parties) => [...all_parties, party]);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_parties,
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
    party,
    setParty,
    setParties,
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
