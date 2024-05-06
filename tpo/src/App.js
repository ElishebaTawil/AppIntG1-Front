import React from 'react';
import Nabvar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsCategory from './Pages/EventsCategory';
import Partys from './Pages/Partys';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import AgregarFiesta from './Pages/AgregarFiesta';
import Payments from "./Pages/Payments";
import LoginUser from './Pages/LoginUser';
import BotonesParty from './Components/BotonesParty/BotonesParty';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Nabvar />
        <Routes>
          <Route path='/' element={<EventsCategory category="recintos" />} />
          <Route path='/artistas' element={<EventsCategory category="artistas" />} />
          <Route path='/partys' element={<Partys />} />
          <Route path="/payments" element={<Payments />} />
          <Route path='/partys/:partyId' element={<Partys />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/loginSignUp' element={<LoginSignup />} />
          <Route path='/loginUser' element={<LoginUser />} />
          <Route path="/agregarFiesta" element={<AgregarFiesta />} />
          <Route path="/EventsCategory" element={<EventsCategory />} />
          <Route path="/comprar" element={<BotonesParty />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;