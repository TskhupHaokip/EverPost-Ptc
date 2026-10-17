import ApiClient from "../../ApiClient";

interface Props {
  Post_id: number;
  isOwnPost: boolean;
}

const PostActions = ({ Post_id, isOwnPost }: Props) => {
  const handleDelete = () => {
    ApiClient.delete(`/users/posts/${Post_id}/`)
      .then((res) => {
        console.log(res);
        const Target_id = `post-${Post_id}`;
        document.getElementById(Target_id)?.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isOwnPost ? (
        <button
          onClick={handleDelete}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50 active:bg-blue-100"
        >
          Delete
        </button>
      ) : (
        <button className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200">
          Hide
        </button>
      )}
    </>
  );
};

export default PostActions;
