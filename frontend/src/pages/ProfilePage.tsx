import { useEffect, useState } from "react";
import ApiClient from "../ApiClient";
import { type PostProps, type ProfileProps } from "../models/model";
import ProfileCard from "../components/ProfileCard";
import Skeleton1 from "../components/Skeleton1";
import PostCard from "../components/PostCard";

const ProfilePage = () => {
  const [Profile, setProfile] = useState<ProfileProps | null>(null);
  const [Posts, setPosts] = useState<PostProps[] | null>(null);

  useEffect(() => {
    ApiClient.get("/api/user/profile/")
      .then((res) => {
        console.log(res.data);
        setProfile(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    ApiClient.get("/users/posts/")
      .then((res) => {
        console.log(res.data);
        const posts = res.data;
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!Profile) {
    return <Skeleton1 />;
  }
  console.log(Posts);
  return (
    <div id="profile" className="flex flex-1 p-2 gap-2 flex-col items-center">
      <ProfileCard profile={Profile} username="Khup" isOwnProfile={true} />
      {Posts && Posts.length > 0 ? (
        Posts.map((post) => (
          <PostCard key={post.id} Post={post} isOwnPost={true} />
        ))
      ) : (
        <div>Empty Posts No Post yet</div>
      )}
    </div>
  );
};

export default ProfilePage;
