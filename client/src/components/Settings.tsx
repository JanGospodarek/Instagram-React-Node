import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "./Main/MainNavbar";
import { MainSidePanel } from "./Main/MainSidePanel";
import { RootState, appActions } from "../store/store";
import { Check } from "phosphor-react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Settings = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const imie = useSelector((state: RootState) => state.app.name);
  const userName = useSelector((state: RootState) => state.app.userName);
  const lastName = useSelector((state: RootState) => state.app.lastName);

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
          const { name, lastName, email, userName } = data.data;
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
              userName,
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
      <MainNavbar name={imie} />
      <main className="w-full h-screen grid grid-cols-[100px_1fr]">
        <MainSidePanel />
        <div className="w-full   flex flex-col overflow-y-scroll ">
          <div className="flex flex-row items-center p-20 border-b-2 border-base-200">
            <button className="btn btn-ghost btn-circle avatar w-36 h-36">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </button>
            <h1 className="text-4xl font-bold	ml-16">{userName}</h1>
          </div>
          <div className="flex flex-col pl-4">
            <div className="flex flex-row items-end">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Nazwa uzytkownika</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={userName}
                />
              </div>
              <button className="btn btn-square btn-outline btn-success ml-5">
                <Check size={32} />
              </button>
            </div>
            <div className="flex flex-row items-end">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Imie</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={imie}
                />
              </div>
              <button className="btn btn-square btn-outline btn-success ml-5">
                <Check size={32} />
              </button>
            </div>
            <div className="flex flex-row items-end">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Nazwisko</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                />
              </div>
              <button className="btn btn-square btn-outline btn-success ml-5">
                <Check size={32} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
