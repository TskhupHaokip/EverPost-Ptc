import type { ReactNode } from "react";

interface PostButtonProps {
  children: ReactNode;
  label: string;
  id?: string;
  onClick?: () => void;
  className?: string;
}

const PostButton = ({
  children,
  label,
  onClick,
  className = "",
}: PostButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`h-6 w-7 p-1 rounded-lg hover:bg-green-500
        flex  shrink-0 items-center justify-center
        
        transition-all duration-200
      
        active:scale-90
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PostButton;
