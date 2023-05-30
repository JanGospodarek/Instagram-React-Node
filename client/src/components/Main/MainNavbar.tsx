import { useEffect } from "react";
import Fetch from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MainNavbar = (props: { name: string }) => {
  const image = useSelector((state: RootState) => state.app.image);
  console.log(image);

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Instagram</a>
      </div>
      <p>{props.name}</p>

      <button className="btn btn-ghost btn-circle avatar">
        <img src={image} />
      </button>
    </div>
  );
};
export default MainNavbar;
