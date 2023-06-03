import { useSelector } from "react-redux";
import MainNavbar from "./Main/MainNavbar";
import { RootState } from "../store/store";
import { useInitUserData } from "../hooks/useInitUserData";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MainSidePanel } from "./Main/MainSidePanel";
import { Check, Trash } from "phosphor-react";
import Fetch from "../hooks/Fetch";
import { Plus } from "phosphor-react";
import Alert from "./Alert";
export const AddPhoto = () => {
  const imie = useSelector((state: RootState) => state.app.userName);
  const token = useSelector((state: RootState) => state.app.token);
  const [photoId, setPhotoId] = useState<number | null>(null);
  const [inputError, setInputError] = useState<boolean>(false);
  const [tagVal, setTagVal] = useState<string>("#");
  const [filter, setFilter] = useState<string>("none");
  const [color, setColor] = useState<string>("");
  const [amount, setAmount] = useState<number>(100);
  const [tags, setTags] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<
    { name: string; popularity: string }[]
  >([]);
  const [responses, setResponses] = useState<any>([null, null]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isAlert, setIsAlert] = useState<{
    type: string;
    msg: string;
  } | null>(null);
  const init = useInitUserData();
  useEffect(() => {
    init();
  });
  const handleCloseAlert = () => {
    setIsAlert(null);
  };
  useEffect(() => {
    if (imageRef.current)
      if (filter == "none") {
        imageRef.current.style.filter = "none";
      } else {
        if (filter == "saturate" || filter == "brightness")
          imageRef.current.style.filter = ` ${filter}(${amount}%)`;
        else imageRef.current.style.filter = ` ${filter}(100%)`;
      }
  }, [filter, color, amount]);
  const fetchPhoto = async () => {
    const res = (await Fetch(
      "http://localhost:4000/api/photos/last/" + imie,
      undefined,
      "GET",
      {}
    )) as Response;
    const data = await res.json();

    setPhotoId(data.id);

    const res2 = (await Fetch(
      "http://localhost:4000/api/tags",
      undefined,
      "GET",
      {}
    )) as Response;
    const data2 = await res2.json();
    data2.sort((a: any, b: any) => b.popularity - a.popularity);
    setPopularTags(data2.slice(0, 20));
  };
  // const handleColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const color = e.target.value;
  //   const r = parseInt(color.substr(1, 2), 16);
  //   const g = parseInt(color.substr(3, 2), 16);
  //   const b = parseInt(color.substr(5, 2), 16);
  //   setColor(`rgb(${r},${g},${b})`);
  // };

  const handlePhotoUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting immediately

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/photos");

    // Set custom headers
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Form submitted successfully");
        setIsAlert({ type: "OK", msg: "Post dodany! Teraz pora na edycję!" });
        console.log(xhr.response);
        setTimeout(() => fetchPhoto(), 1000);
      } else {
        console.error("Error submitting form:", xhr.status);
      }
    };
    // @ts-ignore
    xhr.send(new FormData(e.target));
  };

  const handleSubmit = async () => {
    //upload image
    if (filter !== "none") {
      const res = (await Fetch(
        "http://localhost:4000/api/filters",
        { id: photoId, filter, amount },
        "PATCH",
        { Authorization: `Bearer ${token}` }
      )) as Response;
      const data = await res.json();
      //handle Error
      console.log(data);

      if (data.type == "ERROR") {
        // setResponses((state: any) => {
        //   const copy = [...state];
        //   copy[0] = true;
        //   return copy;
        // });
        setIsAlert({
          type: "ERROR",
          msg: "Błąd podczas aktualizowania dancyh posta!",
        });
      } else {
        setIsAlert({ type: "OK", msg: "Zaktualizowano dane posta!" });
        setTimeout(() => window.location.reload(), 3000);
        // setResponses((state: any) => {
        //   const copy = [...state];
        //   copy[0] = true;
        //   return copy;
        // });
      }
      console.log(responses);
    }

    if (tags.length > 0) {
      const compiled: { name: string; popularity: number }[] = [];

      tags.forEach((tag) => {
        compiled.push({ name: tag, popularity: 100 });
      });

      const res = (await Fetch(
        "http://localhost:4000/api/photos/tags/mass",
        { id: photoId, typ: "tag", data: compiled },
        "PATCH",
        { Authorization: `Bearer ${token}` }
      )) as Response;
      const data = await res.json();
      //handle Error
      console.log(data);

      if (data.type == "ERROR") {
        // setResponses((state: any) => {
        //   const copy = [...state];
        //   copy[1] = false;
        //   return copy;
        // });
        setIsAlert({
          type: "ERROR",
          msg: "Błąd podczas aktualizowania dancyh posta!",
        });
      } else {
        setIsAlert({ type: "OK", msg: "Zaktualizowano dane posta!" });

        // setResponses((state: any) => {
        //   const copy = [...state];
        //   copy[1] = true;
        //   return copy;
        // });
      }
      console.log(responses);
    }
  };
  useEffect(() => {
    // let res1 = false,
    //   res2 = false;
    // if (responses[0] && (responses[1] || responses[1] == null)) {
    //   ///alert success
    //   console.log("OK!!");
    //   res1 = true;
    // }
    // if (responses[1] && (responses[0] || responses[0] == null)) {
    //   ///alert success
    //   console.log("OK!!");
    //   res2 = true;
    // }
    // if (res1 && res2) {
    //   console.log("kokss");
    // }
  }, [responses]);
  return (
    <>
      {/* <MainNavbar name={imie} /> */}
      <main className="w-full h-screen grid grid-cols-[200px_1fr]">
        <MainSidePanel />
        <div className=" grid grid-cols-2 ">
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
            {photoId && (
              <>
                <div className="divider mt-5">Edycja dodanego posta</div>
                <p>Najpopularniejsze tagi</p>
                <div className="flex flex-row flex-wrap rounded-lg bg-base-200 mb-4">
                  {popularTags.map((tag) => (
                    <button
                      className="btn btn-xs m-1 btn-primary"
                      onClick={() => {
                        if (!tags.includes(tag.name)) {
                          setTags((state) => [...state, tag.name]);
                        } else {
                          setIsAlert({
                            type: "ERROR",
                            msg: `Tag ${tag.name} został juz dodany do zdjęcia`,
                          });
                        }
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
                <div className="flex flex-row items-end">
                  <div className="form-control w-full max-w-xs ">
                    <input
                      type="text"
                      className={`input input-bordered w-full input-sm  ${
                        inputError && "input-error"
                      }`}
                      placeholder="Dodaj nowy tag do listy "
                      value={tagVal as string}
                      onChange={(e) => {
                        if (e.target.value.split("")[0] !== "#")
                          setInputError(true);
                        else setInputError(false);
                        setTagVal(e.target.value.replace(" ", "_"));
                      }}
                    />
                  </div>

                  <button
                    className={`btn btn-square btn-outline ml-5 btn-sm ${
                      inputError ? "btn-error" : "btn-success "
                    }`}
                    onClick={() => {
                      if (inputError) return;
                      if (tagVal == "#") return;

                      if (!tags.includes(tagVal)) {
                        setTags((state) => [...state, tagVal]);
                        setTagVal("#");
                      } else {
                        setIsAlert({
                          type: "ERROR",
                          msg: `Tag ${tagVal} został juz dodany do zdjęcia`,
                        });
                      }
                    }}
                  >
                    <Plus size={32} />
                  </button>
                </div>
                <div className="flex flex-row flex-wrap items-center mt-8">
                  Tagi:
                  {tags.map((tag) => (
                    <div className="indicator ml-4 mt-4" key={Math.random()}>
                      <button
                        className="indicator-item badge badge-error p-1"
                        onClick={() => {
                          const index = tags.findIndex((el) => el == tag);
                          setTags((state: string[]) => {
                            const copy = [...state];
                            copy.splice(index, 1);
                            return copy;
                          });
                        }}
                      >
                        <Trash />
                      </button>

                      <div className="badge badge-outline">{tag}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row mt-8">
                  Filtry
                  <select
                    className="select select-bordered  select-sm w-28 ml-5"
                    onChange={(e) => setFilter(e.target.value)}
                    defaultValue="none"
                  >
                    <option value="none">Normal</option>
                    <option value="saturate">Saturacja</option>
                    <option value="brightness">Jasność</option>
                    <option value="invert">Negatyw</option>
                    <option value="grayscale">Mono</option>
                  </select>
                  {filter == "saturate" || filter == "brightness" ? (
                    <input
                      className="ml-5"
                      min={1}
                      step={1}
                      max={150}
                      defaultValue={100}
                      type="range"
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  ) : (
                    ""
                  )}
                  {/* {filter == "tint" ? (
                    <input
                      className="ml-5"
                      type="color"
                      onChange={(e) => handleColorChange(e)}
                    />
                  ) : (
                    <input
                      className="ml-5"
                      min={1}
                      step={1}
                      max={100}
                      defaultValue={50}
                      type="range"
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  )} */}
                </div>
                <button
                  className="btn btn-sm btn-outline btn-success mt-5 w-36 mx-auto"
                  onClick={handleSubmit}
                >
                  Zapisz
                </button>
              </>
            )}
          </div>
          <div className="mt-10  w-[400px] h-[400px] mx-auto">
            {photoId !== null && (
              <img
                ref={imageRef}
                src={`http://localhost:4000/api/photos/file/${photoId}`}
                style={{ width: "400px" }}
                className="rounded-lg "
              />
            )}
          </div>
        </div>
      </main>
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
