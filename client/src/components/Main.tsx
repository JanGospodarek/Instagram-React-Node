import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { useEffect } from "react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./Main/MainNavbar";
import { MainSidePanel } from "./Main/MainSidePanel";
import { MainPosts } from "./Main/MainPosts";
const Main = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token == null) {
        nav("/");
        return;
      } else {
        const res = (await Fetch(
          "http://localhost:4000/api/profile",
          undefined,
          "GET",
          { Authorization: `Bearer ${token}` }
        )) as Response;
        const data = await res.json();

        if (data.type == "OK") {
          const { name, lastName, email } = data.data;
          const res2 = (await Fetch(
            "http://localhost:4000/api/profile/photo",
            { email: email },
            "POST",
            {}
          )) as Response;

          const imageData = await res2.blob();
          console.log(URL.createObjectURL(imageData));
          dispatch(
            appActions.login({
              name,
              email,
              lastName,
              token,
              image: URL.createObjectURL(imageData),
            })
          );
        } else {
          //handle Error
          console.log("toke n error");
        }
      }
    };
    fetchUserData();
  });
  return (
    <>
      <MainPosts />
    </>
  );
};
export default Main;
