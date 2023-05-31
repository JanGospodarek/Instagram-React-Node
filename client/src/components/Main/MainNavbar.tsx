import { useEffect } from "react";
import Fetch from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const MainNavbar = (props: { name: string }) => {
  const imie = useSelector((state: RootState) => state.app.name);
  const userName = useSelector((state: RootState) => state.app.userName);
  const nav = useNavigate();
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1 ">
        <h1 className="ml-10 text-4xl font-bold">Instagram</h1>
      </div>
      <p>{userName}</p>

      <button
        className="btn btn-ghost btn-circle avatar ml-5"
        onClick={() => nav("/profile/" + userName)}
      >
        <div className="rounded-full">
          <img src={`http://localhost:4000/api/profile/photo/${userName}`} />
        </div>
      </button>
    </div>
  );
};
export default MainNavbar;
