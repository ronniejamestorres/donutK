import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/AllDonuts" element={<ShowAll />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
