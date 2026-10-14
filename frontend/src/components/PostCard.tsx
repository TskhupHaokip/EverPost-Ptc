import type { PostProps } from "../models/model";

interface PostCardProps {
  Post: PostProps;
  isOwnPost: boolean;
}

const PostCard = ({ Post, isOwnPost }: PostCardProps) => {
  return (
    <article className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-slate-950 text-white shadow-sm">
      {/* Header */}
      <div className="flex items-center bg-cyan-300 justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-blue-700">
            {typeof Post.user === "string" ? Post.user[0]?.toUpperCase() : "U"}
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {Post.user}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(Post.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {isOwnPost && (
          <button
            type="button"
            className="rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Edit
          </button>
        )}
      </div>

      {/* Caption */}
      {Post.caption && (
        <p className="whitespace-pre-wrap px-4 pb-3 text-gray-800">
          {Post.caption}
        </p>
      )}

      {/* Image */}
      {Post.image && (
        <img
          src={Post.image}
          alt="Post"
          className="max-h-140 w-full bg-gray-50 object-contain"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-5 border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-red-500"
        >
          ♡ Like
        </button>

        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Comment
        </button>

        <button
          type="button"
          className="ml-auto text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Share
        </button>
      </div>
    </article>
  );
};

export default PostCard;