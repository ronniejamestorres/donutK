import { useState, useEffect } from "react";

import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowOne from "./pages/ShowOne";
import LandingPage from "./pages/LandingPage";
import GoogleLoginPage from "./pages/GoogleLoginPage";
import TestCheckout from "./component/TestCheckout";
import Cart from "./pages/Cart";

import Address from "./pages/Address";
import Store from "./pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

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
            <Route path="/cartpage" element={<CartPage />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/showone" element={<ShowOne />}></Route>
            <Route path="/TestCheckout" element={<TestCheckout />}></Route>
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
