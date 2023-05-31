import { useNavigate, useParams } from "react-router-dom";
import { ProfilePhotoCard } from "./ProfilePhotoCard";
import MainNavbar from "./Main/MainNavbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { MainSidePanel } from "./Main/MainSidePanel";
import { useEffect } from "react";
import Fetch from "../hooks/Fetch";

export const Profile = () => {
  const { user } = useParams();
  const userName = useSelector((state: RootState) => state.app.userName);
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
          "http://localhost:4000/api/profile/username/" + user,
          undefined,
          "GET",
          {}
        )) as Response;
        const data = await res.json();
        console.log(data);

        if (data.type == "OK") {
          const { name, lastName, email, userName } = data.data;

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
          // nav("/");
        }
      }
    };
    fetchUserData();
  });
  //handle if users exists or not etc
  return (
    <>
      <MainNavbar name={userName} />
      <main className="w-full h-screen grid grid-cols-[100px_1fr]">
        <MainSidePanel />
        <div className="w-full   flex flex-col overflow-y-scroll ">
          <div className="flex flex-row items-center p-20 border-b-2 border-base-200">
            <button className="btn btn-ghost btn-circle avatar w-36 h-36">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </button>
            <h1 className="text-4xl font-bold	ml-16">{user}</h1>
          </div>
          <div className="flex flex-row flex-wrap mt-16 justify-center">
            <label
              htmlFor="my-modal-4"
              className="w-48 h-48 border-2 border-black rounded-lg m-4"
            >
              <img src="" alt="" />
            </label>
            <ProfilePhotoCard id="my-modal-4" />
          </div>
        </div>
      </main>
    </>
  );
};
