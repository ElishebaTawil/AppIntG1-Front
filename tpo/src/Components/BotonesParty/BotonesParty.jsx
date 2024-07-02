import "./BotonesParty.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFiestaData } from '../../ReduxToolkit/partySlice';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectTotalCartItems } from "../../ReduxToolkit/cartSlice";

const BotonesParty = ({ party }) => {
  const user = useSelector((state) => state.user);
  const totalCartItems = useSelector(selectTotalCartItems);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCantidadChange = (event) => {
    setCantidadSeleccionada(parseInt(event.target.value));
  };

  const VerificarStock = () => {
    return cantidadSeleccionada <= party.stock;
  };

  const handleAgregarAlCarrito = () => {
    if (user.isLogged) {
      dispatch(addToCart({ ...party, cantidad: cantidadSeleccionada }));
    } else {
      navigate("/loginSignUp");
    }
  };

  const esAdmin = user.role === "ADMIN";

  const handleModificarFiesta = () => {
    navigate("/modificarFiesta", { state: { party } });
  };

  const handleEliminarFiesta = () => {
    dispatch(deleteFiestaData(party.id));
    navigate("/");
  };

  return (
    <div>
      <div className="barraBotones">
        <div className="boton">
          <select id="fecha" className="estiloBoton" disabled>
            <option>{party.fecha}</option>
          </select>
        </div>
        <div className="boton">
          <select id="hora" className="estiloBoton" disabled>
            <option>{party.hora}</option>
          </select>
        </div>
        <div className="boton">
          <select id="lugar" className="estiloBoton" disabled>
            <option>{party.lugar}</option>
          </select>
        </div>
        <div className="boton">
          <select id="precio" className="estiloBoton" disabled>
            <option>${party.new_price}</option>
          </select>
        </div>
        <div className="boton">
          <select id="cantidad" className="estiloBoton" value={cantidadSeleccionada} onChange={handleCantidadChange}>
            {[...Array(party.stock).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      {esAdmin ? (
        <div className="ComprarPartyButton">
          <button className="botonComprar aviable" onClick={handleModificarFiesta}>MODIFICAR FIESTA</button>
          <button className="botonComprar aviable" onClick={handleEliminarFiesta}>ELIMINAR FIESTA</button>
        </div>
      ) : VerificarStock() ? (
        <div className="ComprarPartyButton">
          <button onClick={handleAgregarAlCarrito} className="botonComprar aviable">AGREGAR AL CARRITO</button>
        </div>
      ) : (
        <div className="ComprarPartyButton">
          <button className="botonComprar disable">AGREGAR AL CARRITO</button>
        </div>
      )}
    </div>
  );
};

export default BotonesParty;
