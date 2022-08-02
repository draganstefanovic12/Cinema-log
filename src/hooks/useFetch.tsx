import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (param: string) => {
  const [data, setData] = useState<any>(null);
  console.log(param);

  useEffect(() => {
    const handleData = async () => {
      const data = await axios.get(param);
      setData(data);
    };
    handleData();
  }, [param]);

  return data;
};
