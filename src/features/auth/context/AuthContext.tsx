import { useQuery } from "react-query";
import { getCurrentUser } from "@/features/api/backendApi";
import { UserModel, User } from "@/pages/Profile/types";
import { createContext, useReducer, ReactNode, useContext, useEffect } from "react";

interface AuthContextProps {
  auth?: {
    username: string;
    token: string;
  };
  dispatch: React.Dispatch<ACTIONS>;
  user: UserModel;
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
      return { auth: action.payload };
    case "LOGOUT":
      return { auth: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { data: user } = useQuery(["currentUser"], getCurrentUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user")!);
    if (auth) {
      dispatch({ type: "LOGIN", payload: auth });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, user }}>{children}</AuthContext.Provider>
  );
};
