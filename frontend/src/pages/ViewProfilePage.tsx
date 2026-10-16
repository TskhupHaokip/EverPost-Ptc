import { useEffect, useState } from "react";
import ApiClient from "../ApiClient";
import type { PostProps, ProfileProps } from "../models/model";
import ProfileCard from "../components/ProfileCard";
import Skeleton1 from "../components/Skeleton1";
import PostCard from "../components/PostCard";

type ViewProfilePageProps = {
  user_id: number;
};

const ViewProfilePage = ({ user_id }: ViewProfilePageProps) => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Posts, setPosts] = useState<PostProps[] | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProfile(null);

    ApiClient.get("/api/users/profiles/" + String(user_id))
      .then((res) => {
        console.log("API response:", res.data);

        const data = res.data;

        // Handles either an array or a single profile object.
        const result = Array.isArray(data) ? data[0] : data;

        if (!result) {
          setError("No profile found for this user.");
          return;
        }

        setProfile(result);

        ApiClient.get(`/users/${user_id}/posts`)
          .then((res) => {
            console.log(res.data)
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile. Check the console.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user_id]);

  if (loading) {
    return <Skeleton1 />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div className="flex flex-1 p-1 flex-col items-center">
      <ProfileCard profile={profile} />
      {Posts && Posts.length > 0 ? (
        Posts.map((post) => (
          <PostCard key={post.id} Post={post} isOwnPost={false} />
        ))
      ) : (
        <div>Empty Posts No Post yet</div>
      )}
    </div>
  );
};

export default ViewProfilePage;
