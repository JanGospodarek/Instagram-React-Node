import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { useEffect } from "react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./Main/MainNavbar";
import { MainSidePanel } from "./Main/MainSidePanel";
import { MainPosts } from "./Main/MainPosts";
import { useInitUserData } from "../hooks/useInitUserData";
const Main = () => {
  const imie = useSelector((state: RootState) => state.app.userName);
  const init = useInitUserData();
  useEffect(() => {
    init();
  });
  return (
    <>
      {/* <MainNavbar name={imie} /> */}
      <main className="w-full h-screen grid grid-cols-[200px_1fr]">
        <MainSidePanel />
        <MainPosts />
      </main>
    </>
  );
};
export default Main;
