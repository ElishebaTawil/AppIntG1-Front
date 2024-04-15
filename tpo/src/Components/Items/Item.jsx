import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return ( 
        <div className='item'>
            <Link to = {`/partys/${props.id}`}><img src={props.image} alt="" /></Link>
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