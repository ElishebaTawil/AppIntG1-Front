import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/partys/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        {props.cantEntradas > 0 ? (
          <div className="item-price-new">${props.newPrice}</div>
        ) : (
          <div className="item-price-new">SOLD OUT!</div>
        )}
      </div>
    </div>
  );
};

export default Item;
