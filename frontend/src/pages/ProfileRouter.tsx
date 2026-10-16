import { useParams } from "react-router-dom";
import ViewProfilePage from "./ViewProfilePage";

function ProfileRoute() {
  const { user_id } = useParams();

  if (!user_id) return <p>Profile not found.</p>;

  return <ViewProfilePage user_id={Number(user_id)} />;
}
export default ProfileRoute