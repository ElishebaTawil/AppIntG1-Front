import React,{useState} from 'react'
import './Navbar.css'
import logo from '../Assets/partylogo.avif'
import cart_icon from '../Assets/scart.png'
import { Link } from 'react-router-dom'



const Nabvar = () => {
    const [menu,setMenu] = useState("eventos")



    return ( 
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='logo'className='logoshopper'/>
                <p>PARTY SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=> setMenu("eventos")}><Link to= '/'>Eventos</Link>{menu==="eventos"? <hr/>:<></>}</li>
                <li onClick={()=> setMenu("recintos")}><Link to= '/recintos'>Recintos</Link>{menu==="recintos"? <hr/>:<></>}</li>
                <li onClick={()=> setMenu("artistas")}><Link to='/artistas'>Artistas</Link>{menu==="artistas"? <hr/>:<></>}</li>
            </ul>

            
            <div className='nav-search'>
                <input type='text' placeholder='Search...' />
                <button>Search</button>
            </div>
                
            <div className='nav-login-cart'>
                <Link to ='/login'><button>Login</button></Link>
                <Link to ='/cart'><img src={cart_icon} alt='' className='logocart'/></Link>
                <div className='nav-cart-count'>0</div>
            </div>

            
        </div>
     );
}
 
export default Nabvar; 