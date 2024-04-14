import React from 'react';
import './Item.css';

const Item = (props) => {
    return ( 
        <div className='item'>
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className='item-prices'>
                {props.newPrice && (
                    <div className='item-price-new'>
                        {props.category !== 'artistas' && '$'}{props.newPrice}
                    </div>
                )}
                {props.oldPrice && (
                    <div className='item-price-old'>
                        {props.category !== 'artistas' && '$'}{props.oldPrice}
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default Item;