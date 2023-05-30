import { MainPost } from "./MainPost";

export const MainPosts = () => {
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-center">
      <MainPost
        userName="example"
        imageData="s"
        tags={["lol", "photo", "wow"]}
      ></MainPost>
      <MainPost
        userName="example 1"
        imageData="s"
        tags={["lol 1", "photo 1", "wow 1"]}
      ></MainPost>
    </div>
  );
};
