import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowData from "./pages/ShowData";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/showall" element={<ShowAll />}></Route>
          <Route path="/showdata" element={<ShowData />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
