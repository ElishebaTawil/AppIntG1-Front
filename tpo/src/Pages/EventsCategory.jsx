import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CSS/EventsCategory.css";
import Item from "../Components/Items/Item";
import { selectAllParties, selectSearch, setSearch, getFiestas } from "../ReduxToolkit/partySlice";

const EventsCategory = (props) => {
  const dispatch = useDispatch();
  const allParties = useSelector(selectAllParties);
  const search = useSelector(selectSearch) || '';
  const [sortBy, setSortBy] = useState(null);

  const status = useSelector((state) => state.party.status);
  const error = useSelector((state) => state.party.error);

  useEffect(() => {
    dispatch(getFiestas());
  }, [dispatch]);

  const handleChangeSortBy = (option) => {
    setSortBy(option);
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const filteredAndSortedParties = useMemo(() => {
    let values = allParties.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    if (sortBy === "price") {
      values.sort((a, b) => a.new_price - b.new_price);
    } else if (sortBy === "date") {
      values.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    return values;
  }, [allParties, search, sortBy]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>{/* <span>Mostrando 1-12</span> de 20 resultados */}</p>
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
        {filteredAndSortedParties.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              newPrice={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EventsCategory;
