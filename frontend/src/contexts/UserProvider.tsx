import {  useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserProps } from "./UserContext";

export function UserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

