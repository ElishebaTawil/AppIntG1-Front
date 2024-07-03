import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CSS/EventsCategory.css";
import Item from "../Components/Items/Item";
import {
  fetchParties,
  selectAllParties,
  selectSearch,
  setSearch,
  selectPartyStatus,
  selectPartyError,
} from "../ReduxToolkit/partySlice";

const EventsCategory = (props) => {
  const dispatch = useDispatch();
  const allParties = useSelector(selectAllParties);
  const search = useSelector(selectSearch) || "";
  const [sortBy, setSortBy] = useState(null);
  const partyStatus = useSelector(selectPartyStatus);
  const partyError = useSelector(selectPartyError);

  useEffect(() => {
    if (partyStatus === "idle") {
      dispatch(fetchParties());
    }
  }, [partyStatus, dispatch]);

  // Lógica para filtrar y ordenar los elementos según la opción seleccionada
  const filteredAndSortedParties = useMemo(() => {
    let values = allParties.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    if (sortBy === "price") {
      values.sort((a, b) => a.price - b.price); // Ordenar por precio
    } else if (sortBy === "date") {
      values.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenar por fecha
    }

    return values;
  }, [allParties, search, sortBy]);

  if (partyStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (partyStatus === "failed") {
    return <div>{partyError}</div>;
  }

  const handleChangeSortBy = (option) => {
    setSortBy(option);
  };
  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value)); // Actualizar el estado de búsqueda
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>{/* <span>Mostrando 1-12</span> de 20 resultados */}</p>
        {/* Botón desplegable para ordenar */}
        <div className="shopCategory-sort">
          Sort by{" "}
          <select
            className="buttonSort"
            value={sortBy}
            onChange={(e) => handleChangeSortBy(e.target.value)}
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>
      <div className="shopCategory-Parties">
        {filteredAndSortedParties.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            newPrice={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsCategory;
