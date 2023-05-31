import { useNavigate, useParams } from "react-router-dom";
import { ProfilePhotoCard } from "./ProfilePhotoCard";
import MainNavbar from "./Main/MainNavbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { MainSidePanel } from "./Main/MainSidePanel";
import { useEffect, useState } from "react";
import Fetch from "../hooks/Fetch";
import Alert from "./Alert";

export const Profile = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const myUserName = useSelector((state: RootState) => state.app.userName);
  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);
  const [userName, setUserName] = useState("");
  const handleCloseAlert = () => {
    setIsAlert(null);
  };
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
          const { userName } = data.data;

          // dispatch(
          //   appActions.login({
          //     name,
          //     email,
          //     lastName,
          //     token,
          //     userName,
          //   })
          // );
          setUserName(userName);
        } else {
          //handle Error
          // nav("/");
          setIsAlert({ type: "ERROR", msg: data.msg });
        }
      }
    };
    fetchUserData();
  });
  //handle if users exists or not etc
  return (
    <>
      <MainNavbar name={myUserName} />
      <main className="w-full h-screen grid grid-cols-[100px_1fr]">
        <MainSidePanel />
        {isAlert !== null ? (
          <Alert
            handleClose={handleCloseAlert}
            type={isAlert.type}
            msg={isAlert.msg}
            noBtn={true}
          />
        ) : (
          <div className="w-full   flex flex-col overflow-y-scroll ">
            <div className="flex flex-row items-center p-20 border-b-2 border-base-200">
              <button className="btn btn-ghost btn-circle avatar w-36 h-36">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </button>
              <h1 className="text-4xl font-bold	ml-16">{userName}</h1>
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
        )}
      </main>
    </>
  );
};
