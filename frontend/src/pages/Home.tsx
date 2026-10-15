import { useCurrentUser } from "../contexts/UserContext";

const Home = () => {
  const { user: CurrentUser } = useCurrentUser();

  return <>This Is Home Page! {CurrentUser?.username}</>;
};

export default Home;