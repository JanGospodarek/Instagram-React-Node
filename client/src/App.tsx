import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
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
