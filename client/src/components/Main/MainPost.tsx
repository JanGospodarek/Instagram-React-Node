import { useNavigate } from "react-router-dom";

export const MainPost = (props: {
  userName: string;
  tags: string[];
  id: number;
  date: Date;
}) => {
  const { userName, tags, date } = props;
  const nav = useNavigate();
  return (
    <div className="w-[600px] flex flex-col rounded-lg shadow-lg mt-8 pb-5 ">
      <div className="grid grid-cols-2 p-10 ">
        <div className="flex flex-row items-center ">
          <button
            className="btn btn-ghost btn-circle avatar ml-5"
            onClick={() => nav("/profile/" + userName)}
          >
            <div className="rounded-full">
              <img
                src={`http://localhost:4000/api/profile/photo/${userName}`}
              />
            </div>
          </button>
          <p className=" text-lg ml-4">{userName}</p>
        </div>

        <div className="flex justify-end items-center">
          {date.toDateString()}
        </div>
      </div>
      <div className=" mx-auto">
        <img
          src={`http://localhost:4000/api/photos/file/${props.id}`}
          style={{ width: "500px" }}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-row mt-5 ml-16 flex-wrap">
        {tags.map((tag: any) => (
          <div
            key={Math.random()}
            className="badge ml-2 badge-outline badge-primary mb-1"
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};
