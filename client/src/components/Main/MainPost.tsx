export const MainPost = (props: {
  userName: string;
  tags: string[];
  imageData: any;
  date: string;
}) => {
  const { userName, tags, imageData, date } = props;
  return (
    <div className="w-[600px] flex flex-col rounded-lg shadow-lg mt-8 pb-5 ">
      <div className="grid grid-cols-2 p-10 ">
        <div className="flex flex-row items-center ">
          <button className="btn btn-ghost btn-circle avatar">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </button>
          <p className="text-primary text-lg ml-4">{userName}</p>
        </div>

        <div className="flex justify-end items-center">{date}</div>
      </div>
      <div className="rounded-lg w-[500px] h-[500px] border-2 border-black mx-auto">
        <img src="" alt="" />
      </div>
      <div className="flex flex-row mt-5 ml-16">
        {tags.map((tag) => (
          <div key={tag} className="badge ml-2 badge-outline">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
