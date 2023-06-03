import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import Fetch from "./Fetch";
import { useNavigate } from "react-router-dom";

export const useInitUserData = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

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
        const { name, lastName, email, userName } = data.data;
        console.log(token);

        dispatch(
          appActions.login({
            name,
            email,
            lastName,
            token,
            userName,
          })
        );
      } else {
        //handle Error

        nav("/tokenExpired");
      }
    }
  };
  return fetchUserData;
};
