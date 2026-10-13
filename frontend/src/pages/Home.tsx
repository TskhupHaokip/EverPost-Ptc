import axios from "axios";
import ApiClient from "../ApiClient";
import { useEffect } from "react";
import { User } from "../models/model";

type HomeProps = {
  CurrentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const Home = ({ CurrentUser, setCurrentUser }: HomeProps) => {
  useEffect(() => {
    ApiClient.get("/api/users/")
      .then((res) => {
        const data = res.data[0];
        setCurrentUser(new User(data.id, data.username));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }
      });
  }, [setCurrentUser]);

  useEffect(() => {
    
  }, [CurrentUser]);

  return <>This Is Home Page! {CurrentUser?.username}</>;
};

export default Home;
