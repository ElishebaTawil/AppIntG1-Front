
import './App.css';
import Nabvar from './Components/Navbar/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Eventos from './Pages/Eventos';
import EventsCategory from './Pages/EventsCategory';
import Partys from './Pages/Partys';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import recinto_banner from './Components/Assets/party_banner.jpg'
import artistas_banner from './Components/Assets/artistas_banner.webp'

function App() {
  return (
    <div >
      <BrowserRouter>
      <Nabvar />
      <Routes>
        <Route path='/' element={<Eventos/>}/>
        <Route path='/eventos' element={<EventsCategory category ="eventos"/>}/>
        <Route path='/recintos' element={<EventsCategory banner={recinto_banner} category ="recintos"/>}/>
        <Route path='/artistas' element={<EventsCategory banner ={artistas_banner} category ="artistas"/>}/>
        <Route path ='/partys' element= {<Partys/>}/>
          <Route path ='./partId' element= {<Partys/>}/>
        
        <Route path ='/cart' element= {<Cart/>}/>
        <Route path ='/login' element= {<LoginSignup/>}/>

      </Routes> 
      <Footer/>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
