import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "./Main/MainNavbar";
import { MainSidePanel } from "./Main/MainSidePanel";
import { RootState, appActions } from "../store/store";
import { Check } from "phosphor-react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Alert from "./Alert";

export const Settings = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);

  // const nameRef = useRef<HTMLInputElement>(null);
  // const lastNameRef = useRef<HTMLInputElement>(null);
  // const userNameRef = useRef<HTMLInputElement>(null);
  // const fileRef = useRef<HTMLInputElement>(null);

  const imie = useSelector((state: RootState) => state.app.name);
  const userName = useSelector((state: RootState) => state.app.userName);
  const lastName = useSelector((state: RootState) => state.app.lastName);
  const token = useSelector((state: RootState) => state.app.token);

  const [nameVal, setName] = useState(imie);
  const [lastNameVal, setLastName] = useState(lastName);
  const [userNameVal, setUserName] = useState(userName);
  const [fileVal, setFile] = useState<any>(null);

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
          nav("/");
        }
      }
    };
    fetchUserData();
  });
  const handleSubmit = async () => {
    const res = (await Fetch(
      "http://localhost:4000/api/profile",
      {
        name: nameVal,
        lastName: lastNameVal,
        userName: userNameVal,
      },
      "PATCH",
      { Authorization: `Bearer ${token}` }
    )) as Response;
    const data: { type: string; msg: string } = await res.json();
    if (data.type == "OK") {
      setIsAlert({ type: "OK", msg: data.msg });
    } else {
      setIsAlert({ type: "ERROR", msg: data.msg });
    }
  };
  const handlePhotoUpload = async () => {
    if (fileVal !== null) {
    }
  };
  return (
    <>
      <MainNavbar name={imie} />
      <main className="w-full h-screen grid grid-cols-[100px_1fr]">
        <MainSidePanel />
        <div className="w-full   flex flex-col overflow-y-scroll ">
          <div className="flex flex-row items-center p-20 border-b-2 border-base-200">
            <div className="avatar">
              <div className="w-36 rounded-full">
                <img
                  src={`http://localhost:4000/api/profile/photo/${userName}`}
                />
              </div>
            </div>
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
                  value={userNameVal}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <button
                className="btn btn-square btn-outline btn-success ml-5"
                onClick={handleSubmit}
              >
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
                  value={nameVal}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                className="btn btn-square btn-outline btn-success ml-5"
                onClick={handleSubmit}
              >
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
                  value={lastNameVal}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <button
                className="btn btn-square btn-outline btn-success ml-5"
                onClick={handleSubmit}
              >
                <Check size={32} />
              </button>
            </div>
            <div className="flex flex-row items-end">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">
                    Ustaw nowe zdjęcie profilowe
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full  max-w-xs"
                  onChange={(e) => setFile(e.target.value)}
                />
              </div>
              <button
                className="btn btn-square btn-outline btn-success ml-5"
                onClick={handlePhotoUpload}
              >
                <Check size={32} />
              </button>
            </div>
          </div>
        </div>
      </main>
      {isAlert ? (
        <Alert
          handleClose={() => setIsAlert(null)}
          type={isAlert.type}
          msg={isAlert.msg}
        />
      ) : (
        ""
      )}
    </>
  );
};
