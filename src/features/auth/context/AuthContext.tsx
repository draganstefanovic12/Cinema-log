import axios from "@/features/axios/incerceptor";
import { AxiosResponse } from "axios";
import { createContext, useReducer, useEffect, ReactNode, useContext, useState } from "react";
import { User, UserModel, UserResponse } from "@/types/types";

interface AuthContextProps {
  user?: {
    username: string;
    token: string;
  };
  dispatch: React.Dispatch<ACTIONS>;
  userStats: UserModel | undefined;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

type ACTIONS = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

const initialState = {};

export const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const authReducer = (state: typeof initialState, action: ACTIONS) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userStats, setUserStats] = useState<UserModel>();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      axios
        .get(`/user/${user.username}`)
        .then((result: AxiosResponse<UserResponse>) => setUserStats(result.data.user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, userStats }}>
      {children}
    </AuthContext.Provider>
  );
};
