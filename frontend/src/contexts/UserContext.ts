import { useContext, createContext } from "react";

export interface UserProps {
  id: number;
  username: string;
}

export interface UserContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export function useCurrentUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProvider is missing");
  }

  return context;
}
