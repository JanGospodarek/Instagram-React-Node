import { useSelector } from "react-redux";
import MainNavbar from "./Main/MainNavbar";
import { RootState } from "../store/store";
import { useInitUserData } from "../hooks/useInitUserData";
import { FormEvent, useEffect, useState } from "react";
import { MainSidePanel } from "./Main/MainSidePanel";
import { Check } from "phosphor-react";
import Fetch from "../hooks/Fetch";
import { Plus } from "phosphor-react";
export const AddPhoto = () => {
  const imie = useSelector((state: RootState) => state.app.userName);
  const token = useSelector((state: RootState) => state.app.token);
  const [photoId, setPhotoId] = useState<number | null>(null);
  const [tagVal, setTagVal] = useState<string>("");
  const [filter, setFilter] = useState<"">("");
  const [tags, setTags] = useState<string[]>([]);
  const init = useInitUserData();
  useEffect(() => {
    init();
  });
  const fetchPhoto = async () => {
    const res = (await Fetch(
      "http://localhost:4000/api/photos/last/" + imie,
      undefined,
      "GET",
      {}
    )) as Response;
    const data = await res.json();

    setPhotoId(data.id);
  };
  const handleSubmit = async () => {};
  const handlePhotoUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting immediately

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/photos");

    // Set custom headers
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Form submitted successfully");
        console.log(xhr.response);
        setTimeout(() => fetchPhoto(), 1000);
      } else {
        console.error("Error submitting form:", xhr.status);
      }
    };
    // @ts-ignore
    xhr.send(new FormData(e.target));
  };
  return (
    <>
      <MainNavbar name={imie} />
      <main className="w-full h-screen grid grid-cols-[100px_1fr]">
        <MainSidePanel />
        <div className=" grid grid-cols-2">
          <div className="m-10 flex flex-col">
            <div>
              <form
                action="http://localhost:4000/api/profile"
                method="post"
                encType="multipart/form-data"
                className="flex flex-row items-end"
                onSubmit={(e) => handlePhotoUpload(e)}
              >
                <input
                  type="file"
                  name="file"
                  className="file-input file-input-bordered w-full  max-w-xs"
                  required
                />
                <input type="hidden" name="album" value={imie} />
                <button
                  type="submit"
                  className="btn btn-square btn-outline btn-success ml-5"
                >
                  <Check size={32} />
                </button>
              </form>
            </div>
            {/* {photoId && ( */}
            <>
              <div className="flex flex-row items-end">
                <div className="form-control w-full max-w-xs mt-5">
                  <input
                    type="text"
                    className="input input-bordered w-full "
                    placeholder="Dodaj tag do listy"
                    value={tagVal as string}
                    onChange={(e) => setTagVal(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-square btn-outline btn-success ml-5"
                  onClick={() => {
                    setTags((state) => [...state, tagVal]);
                    setTagVal("");
                  }}
                >
                  <Plus size={32} />
                </button>
              </div>
              <div className="flex flex-row flex-wrap items-center mt-8">
                Tagi:
                {tags.map((tag) => (
                  <div key={tag} className="badge ml-2 badge-outline">
                    {tag}
                  </div>
                ))}
                {tags.length > 0 && (
                  <button
                    className="btn btn-sm btn-outline btn-success ml-5"
                    onClick={handleSubmit}
                  >
                    Dodaj
                  </button>
                )}
              </div>
              <div className="flex flex-row mt-8">
                <select onChange={(e) => setFilter(e.target.value)}>
                  <option value="">Normal</option>
                  <option value="tint">Tint</option>
                  <option value="mono">Mono</option>
                </select>
              </div>
            </>
            {/* )} */}
          </div>
          <div className="mt-10  w-[400px] h-[400px]">
            {photoId !== null && (
              <img
                src={`http://localhost:4000/api/photos/file/${photoId}`}
                style={{ width: "400px" }}
                className="rounded-lg"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
