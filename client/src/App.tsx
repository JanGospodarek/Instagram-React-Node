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
function App() {
  const imie = useSelector((state: RootState) => state.app.name);

  useEffect(() => {
    document.body.setAttribute("data-theme", "autumn");
  }, []);

  return (
    <>
      <BrowserRouter>
        <MainNavbar name={imie} />
        <main className="w-full h-screen grid grid-cols-[100px_1fr]">
          <MainSidePanel />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile/:user" element={<Profile />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:token" element={<Verify />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
