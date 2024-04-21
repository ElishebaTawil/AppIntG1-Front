import './BotonComprarParty.css'
import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const BotonComprarParty = (props) => {
    const { setShoppingCart, shoppingCart } = useContext(ShopContext);
    const { party } = props;
    const { addToCart } = useContext(ShopContext);

    const handleClickAddProduct = () => {
        setShoppingCart([...shoppingCart, party]);
    };

    return (
        <div className='ComprarPartyButton'>
            
                <button onClick={() => addToCart(party.id)} className="botonComprar">AGREGAR AL CARRITO</button>
                
            
        </div>
    );
};

export default BotonComprarParty;
