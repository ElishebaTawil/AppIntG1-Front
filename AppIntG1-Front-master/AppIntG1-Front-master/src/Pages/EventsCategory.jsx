import React, { useContext } from 'react';
import './CSS/EventsCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const EventsCategory = (props) => {
    const { all_parties } = useContext(ShopContext);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Mostrando 1-12</span> de 20 resultados
                </p>
                <div className='shopCategory-sort'>
                    Sort by <img className='icono' src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className='shopCategory-Parties'>
                {all_parties.map((item, index) => {
                    if (item.category === props.category) {
                        return (
                            <Item
                                key={index}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                // Render price information conditionally
                                newPrice={props.category === 'artistas' ? null : `${item.new_price}`}
                                oldPrice={props.category === 'artistas' ? null : `${item.old_price}`}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

export default EventsCategory;