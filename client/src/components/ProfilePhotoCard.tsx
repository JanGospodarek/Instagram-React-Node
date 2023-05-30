export const ProfilePhotoCard = (props: { id: string }) => {
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <label htmlFor={props.id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="grid grid-cols-2 p-10 ">
            <div className="flex flex-row items-center ">
              <button className="btn btn-ghost btn-circle avatar">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </button>
              <p className="text-primary text-lg ml-4">example</p>
            </div>

            <div className="flex justify-end items-center">27-01-2022</div>
          </div>
          <div className="rounded-lg w-[400px] h-[400px] border-2 border-black mx-auto">
            <img src="" alt="" />
          </div>
          <div className="flex flex-row mt-5 ml-16">
            {/* {tags.map((tag) => (
          <div key={tag} className="badge ml-2 badge-outline">
            {tag}
          </div>
        ))} */}
            <div className="badge ml-2 badge-outline"> wow</div>
            <div className="badge ml-2 badge-outline"> wow</div>
            <div className="badge ml-2 badge-outline"> wow</div>
            <div className="badge ml-2 badge-outline"> wow</div>
          </div>
        </label>
      </label>
    </>
  );
};
