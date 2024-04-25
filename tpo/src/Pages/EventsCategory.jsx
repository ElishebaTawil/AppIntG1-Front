import React, { useContext, useMemo, useState } from 'react';
import './CSS/EventsCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const EventsCategory = (props) => {
    const { all_parties, search } = useContext(ShopContext);
    const [sortBy, setSortBy] = useState(null); // Estado para almacenar la opción seleccionada

    const handleChangeSortBy = (option) => {
        setSortBy(option);
    };

    // Lógica para filtrar y ordenar los elementos según la opción seleccionada
    const filteredAndSortedParties = useMemo(() => {
        let values = all_parties.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });

        if (sortBy === 'price') {
            values.sort((a, b) => a.new_price - b.new_price); // Ordenar por precio
        } else if (sortBy === 'date') {
            values.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenar por fecha
        }

        return values;
    }, [all_parties, search, sortBy]);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className='shopcategory-indexSort'>
                <p>
                    {/* <span>Mostrando 1-12</span> de 20 resultados */}
                </p>
                {/* Botón desplegable para ordenar */}
                <div className='shopCategory-sort'>
                    Sort by{' '}
                    <select  className= 'buttonSort' value={sortBy} onChange={(e) => handleChangeSortBy(e.target.value)}>
                        <option value="">Select</option>
                        <option value="price">Price</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>
            <div className='shopCategory-Parties'>
                {filteredAndSortedParties.map((item, index) => {
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
