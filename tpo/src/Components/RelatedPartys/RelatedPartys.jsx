import React from "react";
import "./RelatedPartys.css";
import data_product from "../Assets/data";
import Item from "../Items/Item";
import { useSelector } from "react-redux";
import { selectAllParties } from "../../ReduxToolkit/partySlice";

const RelatedPartys = () => {
  const allParties = useSelector(selectAllParties);
  const firstThreeParties = allParties.slice(3, 7);
  return (
    <div className="relatedproducts">
      <h1>Fiestas relacionadas</h1>
      <hr />
      <div className="relatedproducts-item">
        {firstThreeParties.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              newPrice={item.price}
              cantEntradas={item.cantEntradas}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPartys;
