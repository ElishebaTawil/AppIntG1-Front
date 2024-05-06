import React, { useContext, useState, useEffect } from "react";
import "./CSS/LoginSignup.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const AgregarFiesta = () => {
  const { agregarParty, allParties } = useContext(ShopContext);
  const [registro, setRegistro] = useState({
    name: "",
    image: "",
    new_price: 0,
    old_price: 0,
    category: "recintos",
    fecha: "",
    hora: "",
    lugar: "",
    ubicacion: "",
    cantEntradas: 1,
    descripcion: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeValues = ({ target }) => {
    //me quedo con el target de todo el objeto value
    setRegistro({ ...registro, [target.name]: target.value });
  };

  const handleContinuarClick = () => {
    // Verificar si alguno de los campos está vacío
    const { name, fecha, hora, lugar, new_price, stock, image } = registro;
    if (!name || !fecha || !hora || !lugar || !new_price || !stock || !image) {
      // Si alguno de los campos está vacío, mostrar mensaje de error
      setErrorMessage("Por favor, completá los campos obligatorios.");
      return; // No continuar con el proceso de agregar fiesta
    }
    // Si todos los campos están llenos, llamamos a setFiesta
    const nuevoId =
      allParties.length > 0 ? allParties[allParties.length - 1].id + 1 : 1;
    const party = { id: nuevoId, ...registro };

    // Agrega la nueva fiesta a la lista
    agregarParty(party);
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
            type="date"
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
            type="number"
            name="stock"
            onChange={onChangeValues}
            placeholder="Cantidad de Entradas del Evento (*)"
            value={registro.stock}
          />
          <input
            type="number"
            name="new_price"
            onChange={onChangeValues}
            placeholder="Precio de la Entrada del Evento (*)"
            value={registro.new_price}
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
