import { usePost } from "../../contexts/PostContext";
import PostImageCard from "./PostImageCard";

const PostContent = () => {
  const Post = usePost();
  return (
    <div className="flex mt-2  flex-1 flex-col p-2 rounded-2xl border-violet-700 border gap-1 font-semibold">
      <p className="whitespace-pre-wrap text-white wrap-break text-sm leading-7  ">
        {Post.caption}</p>
      <div className=" flex flex-1 ">
        {Post.image && <PostImageCard ImageUrl={Post.image} />}
      </div>
    </div>
  );
};

export default PostContent;
