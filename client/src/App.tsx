import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verify from "./components/Verify";
import Home from "./components/Home";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  useEffect(() => {
    document.body.setAttribute("data-theme", "autumn");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
