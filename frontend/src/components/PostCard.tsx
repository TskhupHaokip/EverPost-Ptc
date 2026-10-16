import { useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import type { PostProps } from "../models/model";
import PostContent from "./posts/PostContent";
import PostHeader from "./posts/PostHeader";
import PostStats from "./posts/PostStats";
import ApiClient from "../ApiClient";

interface PostCardProps {
  Post: PostProps;
  isOwnPost: boolean;
}

interface UserLikeData {
  id: number;
  username: string;
}

const PostCard = ({ Post, isOwnPost }: PostCardProps) => {
  const [numLikes, setNumLikes] = useState<number>(0);
  const [isLoading, setisLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState<boolean | undefined>(undefined);
  const [UserLikeData, setUserLikeData] = useState<UserLikeData[]>([]);
  useEffect(() => {
    ApiClient.get(`users/posts/${Post.id}/likes/`)
      .then((res) => {
        const likes = res.data;

        setNumLikes(likes.length);

        const checkLiked = likes.some(
          (like: { username: string }) => like.username === Post.user,
        );

        setHasLiked(checkLiked);

        const allUsers: UserLikeData[] = likes.map(
          (like: { user_id: number; username: string }) => ({
            id: like.user_id,
            username: like.username,
          }),
        );

        setUserLikeData(allUsers);
      })
      .catch(console.error)
      .finally(() => {
        setisLoading(false);
      });
  }, [Post.id, Post.user]);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <PostContext.Provider value={Post}>
      <article className="w-full max-w-3xl p-3 border-gray-200 shadow-sm rounded-2xl bg-slate-800">
        <PostHeader isOwnPost={isOwnPost} />
        <PostContent />
        <PostStats
          has_like={hasLiked}
          num_of_likes={numLikes}
          num_of_comments={12}
          UserLikeData={UserLikeData}
        />
      </article>
    </PostContext.Provider>
  );
};

export default PostCard;
