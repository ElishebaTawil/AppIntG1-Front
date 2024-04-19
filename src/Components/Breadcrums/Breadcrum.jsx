import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/arrow_icon.webp'

const Breadcrum = (props) => {
    const {party} = props;
    return ( 
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {party.category.toUpperCase()} <img src={arrow_icon} alt="" /> {party.name}
        </div>
     );
}
 
export default Breadcrum;

