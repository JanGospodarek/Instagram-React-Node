import { useParams } from "react-router-dom";
import { ProfilePhotoCard } from "./ProfilePhotoCard";

export const Profile = () => {
  const { user } = useParams();

  //handle if users exists or not etc
  return (
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
  );
};
