import React,{useState, useContext} from "react"
import './Navbar.css'
import logo from "../Assets/logo2.png";
import cart_icon from "../Assets/bolsa_compras.jpg";
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';
import lupa from '../Assets/lupa.png'
import { IconButton } from "@mui/material";



const Nabvar = () => {
    const [menu,setMenu] = useState("recintos")
    const {getTotalCartItems} = useContext(ShopContext);
    const [localSearch, setLocalSearch] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const { shoppingCart, setSearch } = useContext(ShopContext);
    const { user } = useContext(ShopContext);
  
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
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='logo'className='logoshopper'/>
                </div>  
            {/* Botón de hamburguesa */}
            <button className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
              <div className="menu-icon-lines"></div>
              <div className="menu-icon-lines"></div>
              <div className="menu-icon-lines"></div>
            </button>

          <ul className={`nav-menu ${showMenu ? "show" : ""}`}>
            <li onClick={() => setMenu("recintos")}>
              <Link to="/">HOME</Link>

            </li>
            <li onClick={() => setMenu("addCard_screen")}>
              <Link to="/addCard_screen">VENDER</Link>

            </li>
            {user.name ? (
              <div className="loginName">
                <p>HOLA, {user.name}!</p>
              </div>
                ) : (   
                  <li onClick={() => setMenu("login")}>
                    <Link to="/login">LOG IN/SING UP</Link>

                  </li>
                )}
          </ul>

            
            <div className='nav-search'>
                <input type='text' placeholder='Search...' onChange={handleChangeSearch} />
                <IconButton onClick={handleClickSearch}>
                <img src={lupa} alt="search" />
                </IconButton>
            </div>
                
            <Link className='nav-login-cart' to ='/cart'>
                
                <img src={cart_icon} alt='' className='logocart'/>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </Link>
          
        </div>
     );
     
    }
 
export default Nabvar; 
