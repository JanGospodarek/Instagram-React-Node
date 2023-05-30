import { useParams } from "react-router-dom";

export const Profile = () => {
  const { user } = useParams();

  return <div>{user}</div>;
};
