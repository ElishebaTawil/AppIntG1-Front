import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedPartys from "../Components/RelatedPartys/RelatedPartys";

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
      <Breadcrum party={party} />
      <ProductDisplay party={party} />
      <DescriptionBox />
      <RelatedPartys />
    </div>
  );
};

export default Partys;
