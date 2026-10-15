import { useState } from "react";
import PostButton from "./PostButton";

interface PostStatsProps {
  has_like: boolean;
  num_of_likes: number;
  num_of_comments: number;
}

const PostStats = ({
  has_like,
  num_of_likes,
  num_of_comments,
}: PostStatsProps) => {
  const [isLiked, setIsLiked] = useState(has_like);
  const [likes, setLikes] = useState(num_of_likes);

  const handleLike = () => {
    setIsLiked((previous) => !previous);

    setLikes((previous) =>
      isLiked ? previous - 1 : previous + 1
    );
  };

  return (
    <div className="flex items-center gap-3 w-full mt-2 p-1">

      <div className="flex items-center gap-1">
        <PostButton
          label={isLiked ? "Unlike post" : "Like post"}
          onClick={handleLike}
        
          children={<img
            src={isLiked ? "/UnLike.svg" : "/Like.svg"}
            alt=""
            className="h-5 w-5"
          />}
        />
        <p>{likes}</p>
      </div>

      <div className="flex items-center gap-1">
        <PostButton label="Comment on post"
          children={<img src="/Comment.svg" alt=""  />}
        />
        <p>{num_of_comments}</p>
      </div>

      <PostButton label="Share post"
        children={<img src="/Share1.svg" alt=""  />}
      />

      <PostButton label="View all likes" className="ml-auto"
        children={<img src="/EyeIcon.svg" alt=""  />}
      />

    </div>
  );
};

export default PostStats;