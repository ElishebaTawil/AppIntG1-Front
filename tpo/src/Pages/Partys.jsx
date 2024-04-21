import React from "react";
import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import './CSS/Partys.css';
import HeaderParty from "../Components/HeaderParty/HeaderParty";
import BotonesParty from "../Components/BotonesParty/BotonesParty";
import BotonComprarParty from "../Components/BotonComprarParty/BotonComprarParty";
const Partys = () => {
  const { all_parties, user } = useContext(ShopContext);
  const { partyId } = useParams();
  const party = all_parties.find((e) => e.id === Number(partyId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(user);

  return (
    <div>

      <HeaderParty party={party}/>
      <div>
      <BotonesParty party = {party}/>
      </div>
      <div className="botonParaComprar" style={{marginTop: '20px'}}>
      <BotonComprarParty party={party}/>
      </div>
      
      
      
    </div>
  );
};

export default Partys;
