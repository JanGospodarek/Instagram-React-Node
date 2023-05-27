import { useRef, useState } from "react";
import compileValidityClasses from "../hooks/useCompileClassValidity";
import Fetch from "../hooks/Fetch";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appActions } from "../store/store";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setPassword(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setEmail(value);
  };

  const handleSubmit = async () => {
    let errorWasFound = false;

    if (password.length < 8) {
      passwordRef.current!.classList.add("input-error");
      errorWasFound = true;
    }
    if (!email.includes("@")) {
      emailRef.current!.classList.add("input-error");
      errorWasFound = true;
    }
    if (errorWasFound) {
      return;
    } else {
      //handle login
      try {
        const res = (await Fetch(
          "http://localhost:4000/api/user/login",
          {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
          },
          "POST",
          {}
        )) as Response;
        const { type, msg, token } = await res.json();

        setIsAlert({ type, msg });

        if (type == "OK") {
          //redirect to home page
          console.log("token", token);
          localStorage.setItem("token", token);
          nav("/main");
        } else {
          // refresh form
          setTimeout(() => {
            handleCloseAlert();
          }, 5000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCloseAlert = () => {
    setIsAlert(null);
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold w-full text-center mb-12">
              Log in
            </h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  value={email}
                  ref={emailRef}
                  placeholder="Must include '@'"
                  className={`input input-bordered  ${compileValidityClasses(
                    "email",
                    undefined,
                    email
                  )}`}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="At least 8 characters"
                  value={password}
                  ref={passwordRef}
                  className={`input input-bordered  ${compileValidityClasses(
                    "password",
                    password,
                    undefined
                  )}`}
                  onChange={(e) => handlePasswordChange(e)}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAlert ? (
        <Alert
          handleClose={handleCloseAlert}
          type={isAlert.type}
          msg={isAlert.msg}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Login;
