import React from 'react'
import './NewsLetter.css';
const NewsLetter = () => {
    return ( 
        <div className='newsletter'>
            <h2>Ofertas exclusivas a tu E-mail</h2>
            <p>Recibe ofertas exclusivas y promociones antes que nadie</p>
            <div>
                <input type="email" placeholder='Ingresa tu E-mail'/>
                <button>Suscribite</button>
            </div>
        </div>
     );
}
 
export default NewsLetter;