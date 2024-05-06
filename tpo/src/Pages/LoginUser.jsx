import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../Redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [registro, setRegistro] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const navigate = useNavigate();

  const onChangeValues = ({ target }) => {
    setRegistro({ ...registro, [target.name]: target.value });
  };

  const handleContinuarClick = () => {
    // Realiza validaciones de los campos y lógica de registro/login

    if (!registro.name || !registro.email || !registro.password) {
      // Si alguno de los campos está vacío, mostrar mensaje de error
      setErrorMessage("Por favor, completá todos los campos.");
      return; // No continuar con el proceso de creación de usuario
    }

    if (!aceptarTerminos) {
      setErrorMessage("Debes aceptar nuestros Términos y Condiciones.");
      return;
    }

    // Dispatch de la acción correspondiente
    if (registro.isLogged) {
      // Si ya hay un usuario logueado, se trata de un inicio de sesión
      dispatch(loginUser(registro));
    } else {
      // Si no hay un usuario logueado, se trata de un registro
      dispatch(registerUser(registro));
    }
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
            value={registro.name || ""}
          />
          <input
            type="email"
            name="email"
            onChange={onChangeValues}
            placeholder="Tu Email"
            value={registro.email || ""}
          />
          <input
            type="password"
            name="password"
            onChange={onChangeValues}
            placeholder="Tu Contraseña"
            value={registro.password || ""}
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
            onChange={() => setAceptarTerminos(!aceptarTerminos)}
          />
          <p className="loginsignup-login">
            Al registrarte aceptas nuestros{" "}
            <span>Términos y Condiciones</span> y{" "}
            <span>Política de Privacidad</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
