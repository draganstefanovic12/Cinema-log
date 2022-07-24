import { createContext, ReactNode, useContext, useState } from "react";

interface UserCont {
  user: string;
}

interface Provider {
  children: ReactNode;
}

const UserContext = createContext({} as UserCont);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: Provider) => {
  const [user, setUser] = useState<string>("");
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
