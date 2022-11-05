import axios from "@/features/api/backendApi";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useEffect, useState } from "react";

export const useFetch = (param: string) => {
  const [data, setData] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleData = async () => {
      const data = await axios.get(param);
      setData(data);
    };
    handleData();
  }, [param, user]);

  return data;
};
