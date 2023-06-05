import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "./Main/MainNavbar";
import { MainSidePanel } from "./Main/MainSidePanel";
import { RootState, appActions } from "../store/store";
import { Check } from "phosphor-react";
import Fetch from "../hooks/Fetch";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import Alert from "./Alert";
import { useInitUserData } from "../hooks/useInitUserData";

export const Settings = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);

  const imie = useSelector((state: RootState) => state.app.name);
  const userName = useSelector((state: RootState) => state.app.userName);
  const lastName = useSelector((state: RootState) => state.app.lastName);
  const token = useSelector((state: RootState) => state.app.token);

  const [nameVal, setName] = useState<string>(imie || "");
  const [lastNameVal, setLastName] = useState<string>(lastName || "");

  useEffect(() => {
    if (nameVal == "") setName(imie);
    if (lastNameVal == "") setLastName(lastName);
  }, [imie, lastName]);

  const init = useInitUserData();
  useEffect(() => {
    init();
  });
  const handleSubmit = async () => {
    const res = (await Fetch(
      "http://localhost:4000/api/profile",
      {
        name: nameVal,
        lastName: lastNameVal,
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

  const handlePhotoUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting immediately

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/profile");

    // Set custom headers
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Form submitted successfully");
        setIsAlert({ type: "OK", msg: "Zdjęcie zmienione! Przeładuj stronę!" });
      } else {
        console.error("Error submitting form:", xhr.status);
      }
    };
    // @ts-ignore
    xhr.send(new FormData(e.target));
  };
  return (
    <>
      {/* <MainNavbar name={imie} /> */}
      <main className="w-full h-screen grid grid-cols-[200px_1fr]">
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
              {/* <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Nazwa uzytkownika</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={userNameVal as string}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <button
                className="btn btn-square btn-outline btn-success ml-5"
                onClick={handleSubmit}
              >
                <Check size={32} />
              </button> */}
            </div>
            <div className="flex flex-row items-end">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Imie</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={nameVal as string}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={25}
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
                  value={lastNameVal as string}
                  onChange={(e) => setLastName(e.target.value)}
                  maxLength={25}
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
                <form
                  action="http://localhost:4000/api/profile"
                  method="post"
                  encType="multipart/form-data"
                  className="flex flex-row items-end"
                  onSubmit={(e) => handlePhotoUpload(e)}
                >
                  <input
                    type="file"
                    name="file"
                    className="file-input file-input-bordered w-full  max-w-xs"
                    required
                  />
                  {/* <input type="hidden" name="token" value={token} /> */}
                  <button
                    type="submit"
                    className="btn btn-square btn-outline btn-success ml-5"
                  >
                    <Check size={32} />
                  </button>
                </form>
              </div>
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
