import { usePost } from "../../contexts/PostContext";
import FormatRelativeTime from "../../utils/FormatRelativeTime";
import { FirstCapName } from "../../utils/util";
import PostActions from "./PostActions";

interface props {
  isOwnPost: boolean;
}

const PostHeader = ({ isOwnPost }: props) => {
  const Post = usePost();

  return (
    <div className="flex flex-1 gap-1 ">
      <div className="flex  w-10 h-10 items-center justify-center rounded-full bg-amber-50">
        <h1 className=" text-cyan-500 text-2xl font-semibold ">
          {FirstCapName(Post.user)}{" "}
        </h1>
      </div>
      <div className="ml-2 font-semibold text-lg">
        <h1>{Post.user} </h1>
        <p className=" text-sm">
          <span>{FormatRelativeTime(Post.created_at)}</span>
        </p>
      </div>

      <div className="flex ml-auto  font-semibold  items-center justify-end ">
        <PostActions Post_id={Post.id} isOwnPost={isOwnPost}/>
      </div>
    </div>
  );
};

export default PostHeader;
