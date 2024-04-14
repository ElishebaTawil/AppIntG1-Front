import React,{createContext} from 'react'
import all_parties from '../Components/Assets/all_parties';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const contextValue = {all_parties};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;