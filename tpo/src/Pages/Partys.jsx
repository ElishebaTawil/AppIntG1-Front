import React from "react";
import { useEffect, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import RelatedPartys from "../Components/RelatedPartys/RelatedPartys";
import "./CSS/Partys.css";
import HeaderParty from "../Components/HeaderParty/HeaderParty";
import BotonesParty from "../Components/BotonesParty/BotonesParty";
import { useNavigate } from "react-router-dom";

const Partys = () => {
  const { allParties } = useContext(ShopContext);
  const { partyId } = useParams();
  const party = allParties.find((e) => e.id === Number(partyId));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeaderParty party={party} />
      <div>
        <BotonesParty party={party} />
      </div>

      <div>
        <RelatedPartys style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
};

export default Partys;
