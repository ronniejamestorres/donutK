import { useState } from "react";
import ShowAll from "./pages/ShowAll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowData from "./pages/ShowData";
import ShowOne from "./pages/ShowOne";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/showall" element={<ShowAll />}></Route>
          <Route path="/showone" element={<ShowOne />}></Route>
          <Route path="/showdata" element={<ShowData />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
