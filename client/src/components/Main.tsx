import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { useEffect } from "react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
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
  return <div> w{imie} w</div>;
};
export default Main;
