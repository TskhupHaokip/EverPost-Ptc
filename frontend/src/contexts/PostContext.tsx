import { createContext, useContext } from "react";
import type { PostProps } from "../models/model";

// 1. Create the Context
export const PostContext = createContext<PostProps | null>(null);

// 2. Create a custom hook to access the Post
export const usePost = (): PostProps => {
  const post = useContext(PostContext);

  if (post === null) {
    throw new Error("usePost must be used inside PostContext.Provider");
  }

  return post;
};

