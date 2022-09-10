import axios from "../features/axios/incerceptor";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

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
