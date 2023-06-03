import { useNavigate, useParams } from "react-router-dom";
import { ProfilePhotoCard } from "./ProfilePhotoCard";
import MainNavbar from "./Main/MainNavbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../store/store";
import { MainSidePanel } from "./Main/MainSidePanel";
import { useEffect, useState } from "react";
import Fetch from "../hooks/Fetch";
import Alert from "./Alert";
import { useInitUserData } from "../hooks/useInitUserData";

export const Profile = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const myUserName = useSelector((state: RootState) => state.app.userName);
  const photos = useSelector((state: RootState) => state.app.posts);
  const init = useInitUserData();

  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhotos, setUserPhotos] = useState<any[]>([]);
  const handleCloseAlert = () => {
    setIsAlert(null);
  };
  useEffect(() => {
    init();
  }, []);
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

          setUserName(userName);

          const res2 = (await Fetch(
            "http://localhost:4000/api/photos",
            undefined,
            "GET",
            {}
          )) as Response;
          const data2 = await res2.json();
          console.log(data2);

          const filtered: any[] = [];
          data2.forEach((photo: any) => {
            if (photo.album == user) filtered.push(photo);
          });
          setUserPhotos(filtered);
          console.log(userPhotos);
        } else {
          //handle Error
          // nav("/");
          setIsAlert({ type: "ERROR", msg: data.msg });
        }
      }
    };
    fetchUserData();
  }, []);
  //handle if users exists or not etc
  return (
    <>
      {/* <MainNavbar name={myUserName} /> */}
      <main className="w-full h-screen grid grid-cols-[200px_1fr]">
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
            <div className="flex flex-row items-center p-20 border-b-2 border-base-200 mr-8">
              <div className="avatar">
                <div className="w-36 rounded-full">
                  <img
                    src={`http://localhost:4000/api/profile/photo/${userName}`}
                  />
                </div>
              </div>
              <h1 className="text-4xl font-bold	ml-16">{userName}</h1>
            </div>
            <div className="flex flex-row flex-wrap mt-16 justify-center">
              {userPhotos.reverse().map((photo: any) => (
                <>
                  <label htmlFor={photo.id} className="w-48 h-48  m-4">
                    <img
                      className="rounded-lg"
                      src={`http://localhost:4000/api/photos/file/${photo.id}`}
                    />
                  </label>
                  <ProfilePhotoCard
                    id={photo.id}
                    tags={photo.tags}
                    userName={photo.album}
                    date={new Date(photo.id)}
                    key={Math.random()}
                  />
                </>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};
