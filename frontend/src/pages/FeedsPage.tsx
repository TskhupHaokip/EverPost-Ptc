import { useEffect, useState } from "react";
import ApiClient from "../ApiClient";
import FeedContents from "../components/feeds/FeedContents";
import FeedHeader from "../components/feeds/FeedHeader";
import type { PostProps, ProfileProps } from "../models/model";
import Skeleton1 from "../components/Skeleton1";
import PostCard from "../components/PostCard";

const FeedsPage = () => {
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

    ApiClient.get("/users/all-posts/")
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

  return (
    <div className="flex flex-1 p-2 gap-2 flex-col items-center">
      <div className="flex flex-col w-full max-w-[55%] justify-center items-center p-1 rounded-2xl bg-white gap-2">
        <FeedHeader ProfileimageUrl={Profile.pic} />
        <FeedContents />

        {Posts && Posts.length > 0 ? (
          Posts.map((post) => (
            <PostCard key={post.id} Post={post} isOwnPost={true} />
          ))
        ) : (
          <div>Empty Posts No Post yet</div>
        )}
      </div>
    </div>
  );
};

export default FeedsPage;
