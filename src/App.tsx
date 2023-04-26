import { useState, useEffect } from "react";
import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowData from "./pages/ShowData";
import ShowOne from "./pages/ShowOne";
import LandingPage from "./pages/LandingPage";
import GoogleLoginPage from "./pages/GoogleLoginPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/googlelogin" element={<GoogleLoginPage />}></Route>
          <Route path="/showall" element={<ShowAll />}></Route>
          <Route path="/showone" element={<ShowOne />}></Route>
          <Route path="/showdata" element={<ShowData />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
