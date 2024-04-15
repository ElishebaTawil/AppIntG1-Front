import React, { createContext, useState } from "react";
import all_parties from "../Components/Assets/all_parties";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [search, setSearch] = useState("");

  const contextValue = {
    all_parties,
    shoppingCart,
    setShoppingCart,
    search,
    setSearch,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
