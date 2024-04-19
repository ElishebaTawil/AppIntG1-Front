import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";
import { ShopContext } from "../Context/ShopContext";

const LoginSignup = () => {
  const { setUser } = useContext(ShopContext);
  const [registro, setRegistro] = useState({});

  const onChangeValues = ({ target }) => {
    //me quedo con el target de todo el objeto value
    setRegistro({ ...registro, [target.name]: target.value });
  };

  console.log(registro);

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
        <button onClick={setUser(registro)}>Continuar</button>
        <p className="loginsignup-login">
          Ya tienes una cuenta? <span>Inicia Sesion</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            Al registrarte aceptas nuestros <span>Terminos y Condiciones</span>{" "}
            y <span>Politica de Privacidad</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
