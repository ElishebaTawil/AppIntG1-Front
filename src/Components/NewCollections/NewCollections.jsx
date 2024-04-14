import React from 'react'
import './NewCollections.css';
import Item from '../Items/Item';
import new_Collections from '../Assets/newCollections';
const NewCollections = () => {
    return ( 
        <div className='new-collections'>
            <h1>NUEVAS FIESTAS</h1>
            <hr />
            <div className='collections'>
                {new_Collections.map((collection,index) => {
                    return <Item 
                                key={index} 
                                id={collection.id} 
                                name={collection.name} 
                                image={collection.image} 
                                newPrice={collection.new_price} 
                                oldPrice={collection.old_price}
                            />
                })}
            </div>
        </div>
     );
}
 
export default NewCollections;