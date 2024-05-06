import "./BotonesParty.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { agregarAlCarrito } from "../../Redux/actions/cartActions";

const BotonesParty = (props) => {
  const { party, user, addToCart } = props;
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const handleCantidadChange = (event) => {
    const cantidad = parseInt(event.target.value);
    setCantidadSeleccionada(cantidad);
  };

  const VerificarStock = (cantidadSeleccionada) => {
    return cantidadSeleccionada <= party.stock;
  };

  const handleAgregarAlCarrito = () => {
    if (user.isLogged) {
      agregarAlCarrito(party.id, cantidadSeleccionada);
    } else {
      // Manejo de la lógica para redirigir al usuario a la página de inicio de sesión
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user, // Suponiendo que tienes un reducer para el usuario en tu store de Redux
});

const mapDispatchToProps = {
  agregarAlCarrito, // Hace que la acción addToCart esté disponible como una propiedad en el componente
};

export default connect(mapStateToProps, mapDispatchToProps)(BotonesParty);
