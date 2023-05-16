import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import { useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
function App() {
  useEffect(() => {
    document.body.setAttribute("data-theme", "bumblebee");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
