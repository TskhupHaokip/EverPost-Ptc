import { useEffect, useState } from "react";
import ApiClient from "../ApiClient";
import type { ProfileProps } from "../models/model";
import Skeleton1 from "./Skeleton1";

const ProfilePics = () => {
  const [Profile, setProfile] = useState<ProfileProps | null>(null);

  useEffect(() => {
    ApiClient.get("/api/user/profile/")
      .then((res) => {
        console.log(res.data);
        setProfile(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!Profile) {
    return <Skeleton1 />;
  }

  return (
    <button className="rounded-full p-1 hover:border-3 border-green-600 bg-white w-6 h-6 hover:scale-200 transition-transform duration-200">
      <img src={Profile.pic} alt="Pic" className="rounded-full" />
    </button>
  );
};

export default ProfilePics;
