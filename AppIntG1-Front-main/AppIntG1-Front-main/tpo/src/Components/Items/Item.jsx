import React from 'react';
import './Item.css';

const Item = (props) => {
    return ( 
        <div className='item'>
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className='item-prices'>
                <div className='item-price-new'>
                    New Price: ${props.newPrice}
                </div>
                <div className='item-price-old'>
                    Old Price: ${props.oldPrice}
                </div>
            </div>
        </div>
     );
}
 
export default Item;