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
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = (evento, cantidad) => {
    
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
    
  };



  const removeFromCart = (itemId) => {
    //excluyo al item con el id que no quiero
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const removeAllFromCart = () => {
    setCartItems([]);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.new_price * item.cantidad;
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let cantEntradas = 0;
    cartItems.forEach((item) => {
      cantEntradas += item.cantidad;
    });
    return cantEntradas;
  };

  const descountStockParty = (id, quantity) => {
    setAllParties((prevParties) =>
      prevParties.map((party) =>
        party.id === id ? { ...party, stock: party.stock - quantity } : party
      )
    );
  };


  const agregarParty = (party) => {
    setAllParties(() => [...allParties, party]);
    console.log("Fiestas: ", allParties);
  };

  const eliminarParty = (partyId) => {
    //Me quedo con todas las fiestas menos con la que quiero eliminar
    setAllParties(allParties.filter((party) => party.id !== Number(partyId)));

    // Actualizar los IDs de las fiestas siguientes
    //for (let i = partyId + 1; i < allParties.length; i++) {
    //allParties[i].id -= 1;
    //}
  };
  const getPartyById = (partyId) => {
    return allParties.find((party) => party.id === partyId);
  };

  

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    allParties,
    agregarParty,
    eliminarParty,
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
    discountApplied,
    setDiscountApplied,
    removeAllFromCart,
    setAllParties,
    getPartyById,
    
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
