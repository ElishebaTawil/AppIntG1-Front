import React from 'react'
import './Offers.css';
import moscujoda from '../Assets/moscu.png';

const Offers = () => {
    return ( 
        <div className='offers'>
            <div className='offers-left'>
                <h1>Fiestas Exclusivas</h1>
                <h2>Ofertas Para Vos</h2>
                <button>Compra Ahora</button>
            </div>
            <div className='offers-right'>
                <img src={moscujoda} alt="moscu" />

            </div>
        </div>
     );
}
 
export default Offers;