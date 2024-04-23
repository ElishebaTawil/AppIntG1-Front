import "./BotonAgregarAlCarrito.css";
import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const BotonAgregarAlCarrito = ({ partyId }) => {
  const { user, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleAgregarAlCarrito = () => {
    if (user.isLogged) {
      addToCart(partyId);
    } else {
      // Redirige al usuario a la página de login/signUp
      navigate("/loginSignUp");
    }
  };

  return (
    <button onClick={handleAgregarAlCarrito} className="botonComprar">
      AGREGAR AL CARRITO
    </button>
  );
};

export default BotonAgregarAlCarrito;
