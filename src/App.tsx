import { useState, useEffect } from "react";

import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GoogleLoginPage from "./pages/GoogleLoginPage";
import Address from "./pages/Address";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import OurCompany from "./pages/OurCompany";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <CartProvider>
      <ShoppingCartProvider>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route
              path="/googleloginpage"
              element={<GoogleLoginPage />}
            ></Route>
            <Route path="/showall" element={<ShowAll />}></Route>
            <Route path="/ourcompany" element={<OurCompany />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="/cartpage" element={<CartPage />}></Route>
            <Route path="/adress" element={<Address />}></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/cancel" element={<Cancel />}></Route>
          </Routes>
        </div>
      </ShoppingCartProvider>
    </CartProvider>
  );
}

export default App;
