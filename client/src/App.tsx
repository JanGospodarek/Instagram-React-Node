import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verify from "./components/Verify";
import Home from "./components/Home";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import { Profile } from "./components/Profile";
import MainNavbar from "./components/Main/MainNavbar";
import { MainSidePanel } from "./components/Main/MainSidePanel";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Settings } from "./components/Settings";
import { AddPhoto } from "./components/AddPhoto";
import { TokenExpired } from "./components/TokenExpired";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile/:user" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/addPhoto" element={<AddPhoto />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tokenExpired" element={<TokenExpired />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
