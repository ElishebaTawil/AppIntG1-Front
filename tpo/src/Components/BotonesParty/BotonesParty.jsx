import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deletePartyAsync,
  selectAllParties,
} from "../../ReduxToolkit/partySlice";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectTotalCartItems } from "../../ReduxToolkit/cartSlice";
import "./BotonesParty.css";

const BotonesParty = (props) => {
  const { party } = props;
  const user = useSelector((state) => state.user);
  const totalCartItems = useSelector(selectTotalCartItems);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parties = useSelector(selectAllParties);

  const handleCantidadChange = (event) => {
    const cantidad = parseInt(event.target.value);
    setCantidadSeleccionada(cantidad);
  };

  const VerificarStock = (cantidadSeleccionada) => {
    return cantidadSeleccionada <= party.cantEntradas;
  };

  const handleAgregarAlCarrito = () => {
    if (user.isLogged) {
      dispatch(addToCart({ ...party, cantidad: cantidadSeleccionada }));
    } else {
      navigate("/loginSignUp");
    }
  };

  const esAdmin = () => {
    return user.role === "ADMIN";
  };

  const handleModificarFiesta = () => {
    navigate("/modificarFiesta", { state: { party } });
  };

  const handleEliminarFiesta = async () => {
    try {
      await dispatch(deletePartyAsync(party.id));
      // Actualizar el estado local después de la eliminación
      const updatedParties = parties.filter((p) => p.id !== party.id);
      // Actualizar el estado local si es necesario
      // Esto depende de cómo esté estructurado tu estado y cómo manejas la actualización
    } catch (error) {
      console.error("Error al eliminar la fiesta:", error);
    }
  };

  return (
    <div>
      <div className="barraBotones">
        <div className="boton">
          <select id="fecha" className="estiloBoton">
            <option selected>{party.fecha}</option>
          </select>
        </div>
        <div className="boton">
          <select id="hora" className="estiloBoton">
            <option selected>{party.hora}</option>
          </select>
        </div>
        <div className="boton">
          <select id="lugar" className="estiloBoton">
            <option selected>{party.lugar}</option>
            <option>{party.ubicacion}</option>
          </select>
        </div>
        <div className="boton">
          <select id="precio" className="estiloBoton">
            <option selected>{"$" + party.price}</option>
          </select>
        </div>
        <div className="boton">
          <select
            id="cantidad"
            className="estiloBoton"
            value={cantidadSeleccionada}
            onChange={handleCantidadChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      {esAdmin() ? (
        <div className="ComprarPartyButton">
          <button
            className="botonComprar aviable"
            onClick={handleModificarFiesta}
          >
            MODIFICAR FIESTA
          </button>
          <button
            className="botonComprar aviable"
            onClick={handleEliminarFiesta}
          >
            ELIMINAR FIESTA
          </button>
        </div>
      ) : VerificarStock(cantidadSeleccionada) ? (
        <div className="ComprarPartyButton">
          <button
            onClick={handleAgregarAlCarrito}
            className="botonComprar aviable"
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      ) : (
        <div className="ComprarPartyButton">
          <button className="botonComprar disable"> AGREGAR AL CARRITO</button>
        </div>
      )}
    </div>
  );
};

export default BotonesParty;
