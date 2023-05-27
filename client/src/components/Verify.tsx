import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Fetch from "../hooks/Fetch";
const Verify = () => {
  const { token } = useParams();
  const nav = useNavigate();
  const [resData, setResData] = useState<string | null>(null);
  const fetchRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await Fetch(
        `http://localhost:4000/api/user/confirm/${token}`,
        undefined,
        "GET",
        {}
      )) as Response;
      return await res.json();
    };

    if (!fetchRef.current)
      fetchData().then((data) => {
        console.log(data);
        setResData(data.type);
      });

    return () => {
      fetchRef.current = true;
    };
  }, [token]);
  console.log(resData);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-5">
            {resData == "OK"
              ? "Twoje konto zostało zweryfikowane!"
              : "Wystąpił błąd weryfikacji lub konto jest juz zweryfikowane!"}
          </h1>
          <button className="btn btn-primary" onClick={() => nav("/")}>
            Strona główna
          </button>{" "}
        </div>
      </div>
    </div>
  );
};
export default Verify;
