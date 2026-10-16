import { useEffect, useRef, useState } from "react";
import PostButton from "./PostButton";
import ProfilePics from "../ProfilePics";
import ApiClient from "../../ApiClient";

const Data = [
  "Khup",
  "peter",
  "Jonny",
  "IamThe",
  "Pagnitaion Lk",
  "H ashjhshjsajhhjsjh",
];

const PostLikeView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  ApiClient.get("")

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative ml-auto">
      <PostButton
        label="View all likes"
        onClick={() => setIsOpen((prev) => !prev)}
        children={<img src="/EyeIcon.svg" alt="" />}
      />

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 max-h-55 w-65 max-w-90 overflow-y-auto rounded-lg border bg-slate-900 p-2 shadow-lg backdrop-blur-md">
          <ul className="flex flex-1 flex-col gap-2 text-lg font-semibold text-cyan-300">
            {Data.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="flex w-full items-center rounded-lg px-2 py-1 hover:bg-slate-950"
              >
                <ProfilePics />
                <p className="px-2 py-1">{name}</p>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close likes"
            className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-white hover:text-red-500"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default PostLikeView;