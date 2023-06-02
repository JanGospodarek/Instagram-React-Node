import { useNavigate } from "react-router-dom";

const Alert = (props: {
  handleClose: () => void;
  type: string;
  msg: string;
  link?: string;
  noBtn?: boolean;
}) => {
  const nav = useNavigate();
  return (
    <div
      className={`alert  shadow-lg  absolute bottom-10 ${
        props.type == "OK" ? "alert-success" : "alert-error"
      }`}
    >
      <div>
        {props.type == "OK" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}

        <p className="break-words">{props.msg}</p>
        {props.link ? (
          <button
            className="btn btn-primary"
            onClick={() => nav(`/verify/${props.link}`)}
          >
            Potwierdź konto
          </button>
        ) : (
          <button
            className={`btn btn-primary ${props.noBtn && "hidden"}`}
            onClick={props.handleClose}
          >
            Zamknij
          </button>
        )}
      </div>
    </div>
  );
};
export default Alert;
