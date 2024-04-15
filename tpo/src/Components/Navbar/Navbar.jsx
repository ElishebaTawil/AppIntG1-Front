import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/partylogo.avif";
import cart_icon from "../Assets/scart.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { IconButton } from "@mui/material";

const Nabvar = () => {
  const { shoppingCart, setSearch } = useContext(ShopContext);
  const [menu, setMenu] = useState("eventos");
  const [localSearch, setLocalSearch] = useState("");
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
    navigate("/recintos");
  };

  const handleClickSearch = () => {
    if (localSearch.length >= 3) {
      setSearch(localSearch);
      navigate("/recintos");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" className="logoshopper" />
        <p>PARTY SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("eventos")}>
          <Link to="/">Eventos</Link>
          {menu === "eventos" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("recintos")}>
          <Link to="/recintos">Recintos</Link>
          {menu === "recintos" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("artistas")}>
          <Link to="/artistas">Artistas</Link>
          {menu === "artistas" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChangeSearch}
        />
        <IconButton onClick={handleClickSearch}>Search</IconButton>
      </div>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link className="nav-login-cart" to="/cart">
        <img src={cart_icon} alt="" className="logocart" />
        <div className="nav-cart-count">{shoppingCart.length ?? 0}</div>
      </Link>
    </div>
  );
};

export default Nabvar;
