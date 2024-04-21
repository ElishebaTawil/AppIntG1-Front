
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Eventos = () => {
    return ( 
        <div>
           <Hero/> 
           <Popular/>
           <Offers/>
           <NewCollections/>
           <NewsLetter/>
        </div>
     );
}
 
export default Eventos;