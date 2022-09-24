import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>();
  const { dispatch } = useAuth();

  const register = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const link = "https://dragpersonalproj.xyz/cinema-log";
    const response = await fetch(`${link}/user/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    if (!json.error) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      window.location.reload();
    } else {
      setError(json.error);
      setIsLoading(false);
    }
  };

  return { error, register, isLoading };
};
