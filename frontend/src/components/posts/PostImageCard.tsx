
import { useState } from "react";

interface PostImageCardProps {
  ImageUrl: string;
}

const PostImageCard = ({ ImageUrl }: PostImageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Image inside the post */}
      <div className="flex w-full overflow-hidden items-center justify-center border-t pt-1  rounded-2xl">
        <img
          src={ImageUrl}
          alt="Post"
          onClick={() => setIsOpen(true)}
          className="block  cursor-zoom-in object-contain"
        />
      </div>

      {/* Image popup */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
        >
          {/* Image and close button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center"
          >
            <img
              src={ImageUrl}
              alt="Enlarged post"
              className="max-h-[75vh] max-w-[75vw] rounded-xl object-contain"
            />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close image"
              className="absolute -right-10 -top-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-white transition-colors duration-200 hover:bg-black/5 hover:text-red-500 active:scale-95  "
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostImageCard;
