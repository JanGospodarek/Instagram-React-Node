import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Fetch from "../hooks/Fetch";
import { useState } from "react";
import Alert from "./Alert";

export const ProfilePhotoCard = (props: {
  id: string;
  tags: any[];
  date: Date;
  userName: string;
}) => {
  const myUserName = useSelector((state: RootState) => state.app.userName);
  const token = useSelector((state: RootState) => state.app.token);

  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);

  const deletePhoto = async () => {
    if (props.userName !== myUserName) return;
    const res = (await Fetch(
      "http://localhost:4000/api/photos/" + props.id,
      undefined,
      "DELETE",
      { Authorization: `Bearer ${token}` }
    )) as Response;
    const data = await res.json();
    setIsAlert({ type: data.type, msg: data.msg });
    if (data.type == "OK") {
    }
  };
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <label htmlFor={props.id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="grid grid-cols-2 p-10 ">
            <div className="flex flex-row items-center ">
              <button className="btn btn-ghost btn-circle avatar ml-5">
                <div className="rounded-full">
                  <img
                    src={`http://localhost:4000/api/profile/photo/${props.userName}`}
                  />
                </div>
              </button>
              <p className=" text-lg ml-4">{props.userName}</p>
            </div>

            <div className="flex justify-end items-center">
              {props.date.toDateString()}
            </div>
          </div>
          <div className="w-[400px] h-[400px]  mx-auto">
            <img
              className="rounded-lg"
              src={`http://localhost:4000/api/photos/file/${props.id}`}
            />{" "}
          </div>
          <div className="flex flex-row mt-5 mx-16 flex-wrap">
            {props.tags.map((tag: any) => (
              <div
                key={tag.name}
                className="badge ml-2 badge-outline badge-primary"
              >
                {tag.name}
              </div>
            ))}
          </div>
          {props.userName == myUserName && (
            <div className=" mx-5 flex justify-end mt-4">
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={deletePhoto}
              >
                Usuń
              </button>
            </div>
          )}
        </label>
        {isAlert ? (
          <Alert
            handleClose={() => setIsAlert(null)}
            type={isAlert.type}
            msg={isAlert.msg}
          />
        ) : (
          ""
        )}
      </label>
    </>
  );
};
