import { House } from "phosphor-react";
import { PlusCircle } from "phosphor-react";
import { Gear } from "phosphor-react";
import { Power } from "phosphor-react";
import { Palette } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetch from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
export const MainSidePanel = () => {
  //prettier-ignore
  const themes= ["light", "dark", "cupcake", "emerald", "retro",  "garden", "cyberpunk","pastel","dracula", "autumn", "lemonade"]
  const token = useSelector((state: RootState) => state.app.token);
  const imie = useSelector((state: RootState) => state.app.name);
  const userName = useSelector((state: RootState) => state.app.userName);
  const nav = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "cupcake"
  );

  const toggleTheme = (el: string) => {
    setTheme(el);
    localStorage.setItem("theme", el);
  };

  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);
  const logout = async () => {
    try {
      const res = (await Fetch(
        "http://localhost:4000/api/logout",
        undefined,
        "GET",
        { Authorization: `Bearer ${token}` }
      )) as Response;

      const data = await res.json();

      if (data.type == "OK") {
        localStorage.removeItem("token");
        nav("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center pt-10">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-4xl font-bold ">Instagram</h1>
      </div>
      <div className="grid grid-cols-2	gap-4">
        <button
          className="btn btn-ghost btn-circle avatar "
          onClick={() => nav("/profile/" + userName)}
        >
          <div className="rounded-full">
            <img src={`http://localhost:4000/api/profile/photo/${userName}`} />
          </div>
        </button>
        <button
          className="btn btn-square btn-outline btn-secondary mb-5"
          onClick={() => nav("/main")}
        >
          <House size={32} className="h-8 w-8" />
        </button>
        <button
          className="btn btn-square btn-outline btn-secondary mb-5 "
          onClick={() => nav("/addPhoto")}
        >
          <PlusCircle size={32} className="h-8 w-8" />
        </button>
        <div className="dropdown dropdown-right">
          <label
            tabIndex={0}
            className="btn btn-square btn-outline btn-secondary mb-5"
          >
            <Palette size={32} className="h-8 w-8" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ml-2"
          >
            {themes.map((el) => (
              <li key={el} className="flex">
                <a onClick={() => toggleTheme(el)}>
                  <div
                    data-theme={el}
                    className=" w-4 h-4 rounded-full bg-primary"
                  ></div>
                  {el}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="btn btn-square btn-outline btn-secondary mb-5"
          onClick={() => nav("/settings")}
        >
          <Gear size={32} className="h-8 w-8" />
        </button>
        <button
          className="btn btn-square btn-outline btn-secondary mb-5"
          onClick={logout}
        >
          <Power size={32} className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
