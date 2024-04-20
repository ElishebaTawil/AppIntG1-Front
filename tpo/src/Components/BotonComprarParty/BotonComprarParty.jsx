import './BotonComprarParty.css'
import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const BotonComprarParty = (props) => {
    const { setShoppingCart, shoppingCart } = useContext(ShopContext);
    const { party } = props;

    const handleClickAddProduct = () => {
        setShoppingCart([...shoppingCart, party]);
    };

    return (
        <div className='ComprarPartyButton'>
            
                <button onClick={handleClickAddProduct} className="botonComprar">Comprar</button>
            
        </div>
    );
};

export default BotonComprarParty;
