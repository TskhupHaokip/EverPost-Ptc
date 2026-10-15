import { PostContext } from "../contexts/PostContext";
import type { PostProps } from "../models/model";
import PostContent from "./posts/PostContent";
import PostHeader from "./posts/PostHeader";
import PostStats from "./posts/PostStats";

interface PostCardProps {
  Post: PostProps;
  isOwnPost: boolean;
}

const PostCard = ({ Post, isOwnPost }: PostCardProps) => {
  return (
    <PostContext.Provider value={Post}>
      <article className="w-full max-w-3xl p-3 border-gray-200 shadow-sm rounded-2xl bg-slate-800">
        <PostHeader isOwnPost={isOwnPost} />
        < PostContent />
        <PostStats has_like={false} num_of_likes={50} num_of_comments={12} />
      </article>
    </PostContext.Provider>
  );
};

export default PostCard;
