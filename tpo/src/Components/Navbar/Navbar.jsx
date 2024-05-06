import logo from "../Assets/logo2.png";
import cart_icon from "../Assets/bolsa_compras.jpg";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import lupa from "../Assets/lupa.png";
import { IconButton } from "@mui/material";
import { logoutUser } from '../../Redux/actions/userActions';

const Navbar = ({ user, getTotalCartItems, setSearch, logoutUser }) => {
  const [menu, setMenu] = useState("recintos");
  const [localSearch, setLocalSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setLocalSearch(value);
    if (!value.length) {
      setSearch("");
    }
    if (value.length >= 3) {
      setSearch(value);
    }
  };

  const handleClickSearch = () => {
    if (localSearch.length >= 3) {
      setSearch(localSearch);
      navigate("/recintos");
    }
  };

  const handleContinuarClick = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" className="logoshopper" />
      </div>
      <button className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <div className="menu-icon-lines"></div>
        <div className="menu-icon-lines"></div>
        <div className="menu-icon-lines"></div>
      </button>

      <ul className={`nav-menu ${showMenu ? "show" : ""}`}>
        <li onClick={() => setMenu("recintos")}>
          <Link to="/">HOME</Link>
        </li>

        {user && user.name === "admin" && (
          <li onClick={() => setMenu("AgregarFiesta")}>
            <Link to="/agregarFiesta">AGREGAR FIESTA</Link>
          </li>
        )}

        {user && user.isLogged ? (
          <>
            <div className="loginName">
              <p>HOLA, {user.name}!</p>
            </div>
            <div>
              <button className="logout-button" onClick={handleContinuarClick}>
                CERRAR SESIÓN
              </button>
            </div>
          </>
        ) : (
          <li onClick={() => setMenu("login")}>
            <Link to="/loginSignUp">LOG IN/SING UP</Link>
          </li>
        )}
      </ul>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChangeSearch}
        />
        <IconButton onClick={handleClickSearch}>
          <img src={lupa} alt="search" />
        </IconButton>
      </div>

      <Link className="nav-login-cart" to="/cart">
        <img src={cart_icon} alt="" className="logocart" />
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user, // Accede al estado del usuario desde Redux
});

const mapDispatchToProps = {
  logoutUser, // Proporciona la acción logoutUser como una prop
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
