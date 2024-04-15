import React from "react";
import Nabvar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Eventos from "./Pages/Eventos";
import EventsCategory from "./Pages/EventsCategory";
import Partys from "./Pages/Partys";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import Payments from "./Pages/Payments";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nabvar />
        <Routes>
          <Route path="/" element={<Eventos />} />
          <Route
            path="/eventos"
            element={<EventsCategory category="eventos" />}
          />
          <Route
            path="/recintos"
            element={<EventsCategory category="recintos" />}
          />
          <Route
            path="/artistas"
            element={<EventsCategory category="artistas" />}
          />
          <Route path="/payments" element={<Payments />} />
          <Route path="/partys" element={<Partys />} />
          <Route path="/partys/:partyId" element={<Partys />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
