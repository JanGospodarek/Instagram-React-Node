import { useEffect } from "react";
import { MainPost } from "./MainPost";
import Fetch from "../../hooks/Fetch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, appActions } from "../../store/store";

export const MainPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.app.posts);
  useEffect(() => {
    const fetchData = async () => {
      const res = (await Fetch(
        "http://localhost:4000/api/photos",
        undefined,
        "GET",
        {}
      )) as Response;
      const data = await res.json();
      console.log(data);

      if (data.type == "ERROR") {
        //handle error
      } else {
        dispatch(appActions.fetchPhotos({ posts: data }));
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-center">
      {posts.map((post) => (
        <MainPost
          key={post.id}
          userName={post.album}
          tags={post.tags}
          date={new Date(post.id)}
          id={post.id}
        />
      ))}
    </div>
  );
};
