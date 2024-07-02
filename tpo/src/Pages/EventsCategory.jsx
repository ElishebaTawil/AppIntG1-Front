import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFiestas, setSearch, selectAllParties } from '../ReduxToolkit/partySlice';
import Item from '../Components/Items/Item';
import './CSS/EventsCategory.css';

const EventsCategory = (props) => {
  const dispatch = useDispatch();
  const allParties = useSelector(selectAllParties);
  const search = useSelector((state) => state.party.search) || '';
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    console.log("Dispatching getFiestas action");
    dispatch(getFiestas());
  }, [dispatch]);

  const handleChangeSortBy = (option) => {
    setSortBy(option);
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const filteredAndSortedParties = useMemo(() => {
    let values = allParties.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    if (sortBy === "price") {
      values.sort((a, b) => a.new_price - b.new_price);
    } else if (sortBy === "date") {
      values.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    return values;
  }, [allParties, search, sortBy]);

  useEffect(() => {
    console.log("All Parties:", allParties);
    console.log("Filtered and Sorted Parties:", filteredAndSortedParties);
  }, [allParties, filteredAndSortedParties]);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
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
            newPrice={item.new_price}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsCategory;
