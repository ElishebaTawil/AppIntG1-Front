import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import { Button } from '@mui/material'

const ProductDisplay = (props) => {
    const { setShoppingCart, shoppingCart } = useContext(ShopContext);

    const {party} = props;
    const handleClickAddProduct = () => {
        setShoppingCart([...shoppingCart, party])
    }

    return (
        <div className='partydisplay'>
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    <img src={party.image} alt="" />              
                </div>               
            </div>
            <div className='productdisplay-right'>
                <h1>{party.name}</h1>
                <div className='productdisplay-right-star'>
                  {/*  <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
    <p>(122)</p>*/}
                </div>
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-new'>
                        $ {party.new_price}
                    </div>
                    <div className='productdisplay-right-price-old'>
                        $ {party.old_price}
                    </div>
                </div>
                <div className='productdisplay-right-description'>
                    Party
                </div>
                
                <Button onClick={handleClickAddProduct}>AGREGAR AL CARRITO</Button>
                <p className='productdisplay-right-category'> <span>Fiesta</span></p>
                <p className='productdisplay-right-category'> <span>Fiesta, Boliche, Noche, Amigos</span></p>
            </div>
        </div>
     );
}
 
export default ProductDisplay;