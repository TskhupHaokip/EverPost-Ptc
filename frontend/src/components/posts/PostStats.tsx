import PostButton from "./PostButton";
import PostLikeView from "./PostLikeView";
import ApiClient from "../../ApiClient";
import { useState } from "react";

interface UserLikeData {
  id: number;
  username: string;
}

interface PostStatsProps {
  has_like?: boolean;
  num_of_likes?: number;
  num_of_comments?: number;
  UserLikeData?: UserLikeData[];
  PostID?: number;
}

const PostStats = ({
  has_like,
  num_of_likes,
  num_of_comments,
  UserLikeData,
  PostID,
}: PostStatsProps) => {
  const [isLiked, setIsLiked] = useState(has_like);
  const [likes, setLikes] = useState(num_of_likes ?? 0);

  const handleLike = async () => {
    try {
      const response = await ApiClient.post("/users/post/likes/toggle/", {
        post_id: PostID,
      });

      setIsLiked(response.data.has_like);
      setLikes(response.data.num_of_likes);
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full mt-2 p-1">
      <div className="flex items-center gap-1">
        <PostButton
          label={isLiked ? "Unlike post" : "Like post"}
          onClick={handleLike}
          children={
            <img
              src={isLiked ? "/Like.svg" : "/UnLike.svg"}
              alt="Like / Un-Like"
              className="h-5 w-5"
            />
          }
        />
        <p>{likes}</p>
      </div>

      <div className="flex items-center gap-1">
        <PostButton
          label="Comment on post"
          children={<img src="/Comment.svg" alt="Comment" />}
        />
        <p>{num_of_comments}</p>
      </div>

      <PostButton
        label="Share post"
        children={<img src="/Share1.svg" alt="Share" />}
      />
      <PostLikeView UserLikeData={UserLikeData} />
    </div>
  );
};

export default PostStats;
