import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { useEffect } from "react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./Main/MainNavbar";
import { MainSidePanel } from "./Main/MainSidePanel";
import { MainPosts } from "./Main/MainPosts";
const Main = () => {
  const imie = useSelector((state: RootState) => state.app.name);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token == null) {
        nav("/");
        return;
      }
      const res = (await Fetch(
        "http://localhost:4000/api/profile",
        undefined,
        "GET",
        { Authorization: `Bearer ${token}` }
      )) as Response;
      const data = await res.json();
      if (data.type == "OK") {
        const { name, lastName, email } = data.data;

        dispatch(appActions.login({ name, email, lastName, token }));
      } else {
        //handle Error
      }
    };
    fetchUserData();
  });
  return (
    <>
      <MainNavbar name={imie} />
      <main className="w-full h-screen grid grid-cols-[1fr_5fr]">
        <MainSidePanel />
        <MainPosts />
      </main>
    </>
  );
};
export default Main;
