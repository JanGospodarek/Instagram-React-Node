import { useNavigate } from "react-router-dom";

export const TokenExpired = () => {
  const nav = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-5">
            Zosałeś wylogowany, poniewaz twoja sesja wygasła
          </h1>
          <button className="btn btn-primary" onClick={() => nav("/")}>
            Strona główna
          </button>
        </div>
      </div>
    </div>
  );
};
