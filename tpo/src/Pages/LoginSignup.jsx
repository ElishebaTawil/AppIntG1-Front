import React, { useContext, useState, useEffect } from "react";
import "./CSS/LoginSignup.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const { setUser } = useContext(ShopContext);
  const [registro, setRegistro] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setAceptarTerminos(!aceptarTerminos);
  };

  const onChangeValues = ({ target }) => {
    //me quedo con el target de todo el objeto value
    setRegistro({ ...registro, [target.name]: target.value, isLogged: true });
  };
  const handleContinuarClick = () => {
    // Verificar si alguno de los campos está vacío
    const { name, email, password } = registro;
    if (!name || !email || !password) {
      // Si alguno de los campos está vacío, mostrar mensaje de error
      setErrorMessage("Por favor, completá todos los campos.");
      return; // No continuar con el proceso de creación de usuario
    }
    if (!aceptarTerminos) {
      setErrorMessage("Debes aceptar nuestros Términos y Condiciones.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    // Si todos los campos están llenos, llamamos a setUser
    setUser(registro); //lo guardo en user
    navigate("/");
    setErrorMessage(""); // Limpiar el mensaje de error
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Registrate</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            name="name"
            onChange={onChangeValues}
            placeholder="Tu Nombre"
            value={registro.name}
          />
          <input
            type="email"
            name="email"
            onChange={onChangeValues}
            placeholder="Tu Email"
            value={registro.email}
          />
          <input
            type="password"
            name="password"
            onChange={onChangeValues}
            placeholder="Tu Contraseña"
            value={registro.password}
          />
        </div>
        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <button onClick={handleContinuarClick}>Continuar</button>
        <p className="loginsignup-login">
          Ya tienes una cuenta?{" "}
          <span onClick={() => navigate("/loginUser")}>Inicia Sesión</span>
        </p>
        <div className="loginsignup-agree">
          <input
            type="checkbox"
            checked={aceptarTerminos}
            onChange={handleCheckboxChange}
          />
          <p className="loginsignup-login">
            Al registrarte aceptas nuestros <span>Términos y Condiciones</span>{" "}
            y <span>Política de Privacidad</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
