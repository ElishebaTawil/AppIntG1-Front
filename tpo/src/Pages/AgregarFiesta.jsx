import React, { useContext, useState, useEffect } from "react";
import "./CSS/LoginSignup.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import all_parties from "../Components/Assets/all_parties";

const AgregarFiesta = () => {
  const { setParty, agregarParty } = useContext(ShopContext);
  const [registro, setRegistro] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeValues = ({ target }) => {
    //me quedo con el target de todo el objeto value
    setRegistro({ ...registro, [target.name]: target.value });
    console.log(registro);
    console.log(all_parties.length);
  };

  const handleContinuarClick = () => {
    // Verificar si alguno de los campos está vacío
    const { name, fecha, hora, lugar, price, stock, image } = registro;
    if (!name || !fecha || !hora || !lugar || !price || !stock || !image) {
      // Si alguno de los campos está vacío, mostrar mensaje de error
      setErrorMessage("Por favor, completá los campos obligatorios.");
      return; // No continuar con el proceso de agregar fiesta
    }
    // Si todos los campos están llenos, llamamos a setFiesta
    const nuevoId =
      all_parties.length > 0 ? all_parties[all_parties.length - 1].id + 1 : 1;
    const party = { ...registro, id: nuevoId };
    setParty(party);
    // Agrega la nueva fiesta a la lista
    agregarParty([...all_parties, party]);
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
            placeholder="Título del Evento (*)"
            value={registro.name}
          />
          <input
            type="text"
            name="fecha"
            onChange={onChangeValues}
            placeholder="Fecha del Evento (DD/MM/AA) (*)"
            value={registro.fecha}
          />
          <input
            type="text"
            name="hora"
            onChange={onChangeValues}
            placeholder="Hora del Evento (HH:MM) (*)"
            value={registro.hora}
          />
          <input
            type="text"
            name="lugar"
            onChange={onChangeValues}
            placeholder="Nombre del Lugar del Evento (*)"
            value={registro.lugar}
          />
          <input
            type="text"
            name="ubicacion"
            onChange={onChangeValues}
            placeholder="Dirección del Lugar"
            value={registro.ubicacion}
          />
          <input
            type="text"
            name="stock"
            onChange={onChangeValues}
            placeholder="Cantidad de Entradas del Evento (*)"
            value={registro.stock}
          />
          <input
            type="text"
            name="price"
            onChange={onChangeValues}
            placeholder="Precio de la Entrada del Evento (*)"
            value={registro.price}
          />
          <input
            type="text"
            name="image"
            onChange={onChangeValues}
            placeholder="URL de la Imagen del Evento (*)"
            value={registro.image}
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
