import React, { useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CSS/EventsCategory.css';
import { changeSortMethod } from '../Redux/actions/eventActions';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const EventsCategory = (props) => {
    const all_parties = useSelector(state => state.all_parties); // Obtener la lista de todas las fiestas del estado de Redux
    const search = useSelector(state => state.search); // Obtener el término de búsqueda del estado de Redux
    const sortBy = useSelector(state => state.event.sortBy); // Obtener el método de ordenación del estado de Redux
    const dispatch = useDispatch();

    const handleChangeSortBy = (option) => {
        dispatch(changeSortMethod(option)); // Dispatch de la acción para cambiar el método de ordenación
    };

    // Lógica para filtrar y ordenar los elementos según el método de ordenación seleccionado
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
                    <select className= 'buttonSort' value={sortBy} onChange={(e) => handleChangeSortBy(e.target.value)}>
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
