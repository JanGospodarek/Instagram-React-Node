import { useRef, useState } from "react";
import compileValidityClasses from "../hooks/useCompileClassValidity";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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

  const handleSubmit = () => {
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
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold w-full text-center mb-12">
              Instagram
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
    </>
  );
};
export default Login;
