import React,{createContext} from 'react'
import all_parties from '../Components/Assets/all_parties';
import {useState, useContext} from 'react';

export const ShopContext = createContext(null);



const getDefaultCart = () => {
    let cart ={};
    for (let index = 0 ; index < all_parties.length + 1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [shoppingCart, setShoppingCart] = useState([]);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState({ name: "", role: "" });
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
    

    const addToCart = (itemId, cantidad) => {
        if (user.name) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + cantidad }));
            console.log(cartItems);
          } else {
            //navigate("/LoginSignup");
          }
    };
    const removeFromCart = (itemId) => {
        setCartItems((prev)=> ({...prev,[itemId]: prev[itemId] - 1}));
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
        }

        const getTotalCartItems = () => {
            let totalItems = 0;
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    totalItems += cartItems[item];
                }
            }
            return totalItems; // Move return statement outside of the loop
        }

    
    const contextValue = {
        getTotalCartItems,getTotalCartAmount,
        all_parties,cartItems,addToCart,removeFromCart,
        shoppingCart,setShoppingCart,search,setSearch, 
        user, setUser,
        cantidadSeleccionada, setCantidadSeleccionada
    };
    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;