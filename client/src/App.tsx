import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verify from "./components/Verify";
import Home from "./components/Home";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import { Profile } from "./components/Profile";
function App() {
  useEffect(() => {
    document.body.setAttribute("data-theme", "autumn");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile/:user" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
