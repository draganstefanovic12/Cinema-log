import axios, { AxiosResponse } from "axios";
import {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useContext,
  useState,
} from "react";

interface AuthContextProps {
  user: {
    username?: string;
    token?: string;
  } | null;
  dispatch: React.Dispatch<any>;
  userStats: AxiosResponse<any, any> | undefined;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const authReducer = (state: any, action: any) => {
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
  const [userStats, setUserStats] = useState<AxiosResponse<any, any>>();
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log(userStats);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      axios
        .get(`http://localhost:5000/user/${user.username}`)
        .then((result: AxiosResponse<any, any>) => setUserStats(result));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, userStats }}>
      {children}
    </AuthContext.Provider>
  );
};
