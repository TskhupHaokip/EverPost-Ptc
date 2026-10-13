import { useEffect, useState } from "react";
import ApiClient from "../ApiClient";
import type { ProfileProps } from "../models/model";
import ProfileCard from "../components/ProfileCard";
import Skeleton1 from "../components/Skeleton1";

const ProfilePage = () => {
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
    <div id="profile" className="flex flex-1 p-1 flex-col items-center">
      <ProfileCard profile={Profile} username="Khup" isOwnProfile={true} />
    </div>
  );
};

export default ProfilePage;
