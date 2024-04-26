import React, { useContext, useState, useEffect } from "react";
import "./CSS/LoginSignup.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import all_parties from "../Components/Assets/all_parties";

const AgregarFiesta = () => {
  const { setFiesta, setParties } = useContext(ShopContext);
  const [registro, setRegistro] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeValues = ({ target }) => {
    //me quedo con el target de todo el objeto value
    setRegistro({ ...registro, [target.name]: target.value });
  };

  const handleContinuarClick = () => {
    // Verificar si alguno de los campos está vacío
    const { name, price, cantEntradas } = registro;
    if (!name || !price || !cantEntradas) {
      // Si alguno de los campos está vacío, mostrar mensaje de error
      setErrorMessage("Por favor, completá los campos obligatorios.");
      return; // No continuar con el proceso de agregar fiesta
    }
    // Si todos los campos están llenos, llamamos a setFiesta
    const nuevoId =
      all_parties.length > 0 ? all_parties[all_parties.length - 1].id + 1 : 1;
    const nuevaFiesta = { ...registro, id: nuevoId };
    setFiesta(nuevaFiesta);
    // Agrega la nueva fiesta a la lista
    setParties([...all_parties], nuevaFiesta);
    navigate(`/partys/${nuevoId}`);
    setErrorMessage(""); // Limpiar el mensaje de error
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Agregar Fiesta</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            name="name"
            onChange={onChangeValues}
            placeholder="Título"
            value={registro.name}
          />
          <input
            type="text"
            name="descripcion"
            onChange={onChangeValues}
            placeholder="Descripcion (Opcional)"
            value={registro.descripcion}
          />
          <input
            type="int"
            name="price"
            onChange={onChangeValues}
            placeholder="Precio de la Entrada"
            value={registro.price}
          />
          <input
            type="text"
            name="image"
            onChange={onChangeValues}
            placeholder="URL de la Imagen"
            value={registro.image}
          />
          <input
            type="int"
            name="cantEntradas"
            onChange={onChangeValues}
            placeholder="Cantidad Total de Entradas"
            value={registro.cantEntradas}
          />
        </div>
        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <button onClick={handleContinuarClick}>Agregar Fiesta</button>
      </div>
    </div>
  );
};

export default AgregarFiesta;
