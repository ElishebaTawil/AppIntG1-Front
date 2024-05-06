import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import RelatedPartys from "../Components/RelatedPartys/RelatedPartys";
import "./CSS/Partys.css";
import HeaderParty from "../Components/HeaderParty/HeaderParty";
import BotonesParty from "../Components/BotonesParty/BotonesParty";
import { getPartyById } from '../Redux/selectors/partySelectors';
import { fetchPartyById } from '../Redux/actions/partyActions';

const Partys = ({ party, fetchPartyById }) => {
  const { partyId } = useParams();

  useEffect(() => {
    fetchPartyById(partyId);
    window.scrollTo(0, 0);
  }, [fetchPartyById, partyId]);

  if (!party) {
    // Puedes mostrar un spinner o un mensaje de carga mientras se obtienen los datos de la fiesta
    return <div>Loading...</div>;
  }

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

const mapStateToProps = (state, ownProps) => ({
  party: getPartyById(state, ownProps.partyId),
});

const mapDispatchToProps = {
  fetchPartyById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Partys);
