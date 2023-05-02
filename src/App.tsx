import { useState } from "react";
import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowData from "./pages/ShowData";
import ShowOne from "./pages/ShowOne";
import LandingPage from "./pages/LandingPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Address";
import Address from "./pages/Address";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/showall" element={<ShowAll />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/showone" element={<ShowOne />}></Route>
          <Route path="/showdata" element={<ShowData />}></Route>
          <Route path="/adress" element={<Address/>}></Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
