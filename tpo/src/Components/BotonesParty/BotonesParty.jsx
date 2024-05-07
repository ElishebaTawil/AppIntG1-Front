import "./BotonesParty.css";
import React, { useState, useContext} from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";

const BotonesParty = (props) => {
  const { party } = props;
  const { user, addToCart } = useContext(ShopContext);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null);
  

  const handleCantidadChange = (event) => {
    const cantidad = parseInt(event.target.value);
    setCantidadSeleccionada(cantidad);
  };
  const VerificarStock = (cantidadSeleccionada) => {
    return cantidadSeleccionada <= party.stock;
  };

  const handleAgregarAlCarrito = () => {
    if (user.isLogged) {
      addToCart(party, cantidadSeleccionada);
    } else {
      // Guarda la ruta actual antes de redirigir al usuario a la página de inicio de sesión
      setPreviousPath(window.location.pathname);
      navigate("/loginSignUp");
    }
  };
  const esAdmin = () => {
     return user.isLogged;

  }
  const modificarFiesta = (party) =>{

  }

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
            <option selected>{"$" + party.new_price}</option>
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
      {VerificarStock(cantidadSeleccionada) ? (
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
      <div>
      {/* Utilizando un objeto para condicionalmente renderizar el botón */}
      {/* {esAdmin() && (
        {
          esAdmin() && (
            <div className="ComprarPartyButton">
              <button className="botonComprar" onClick={() => modificarFiesta(party)}>MODIFICAR FIESTA</button>
            </div>
          )
        }
      )} */}
    </div>
      
    </div>
  );
};

export default BotonesParty;
