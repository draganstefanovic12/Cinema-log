import { useAuth } from "@/features/auth/context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
