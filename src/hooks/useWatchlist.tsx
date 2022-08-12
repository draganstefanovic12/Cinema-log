import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useWatchlist = () => {
  const { user } = useAuth();

  const handleWatch = async (data: any, username: string, type: string) => {
    const parsed = JSON.parse(data);
    await axios(`http://localhost:5000/user/${type}/`, {
      method: "POST",
      data: {
        name: parsed.title === undefined ? parsed.original_name : parsed.title,
        id: parsed.id,
        type: parsed.title === undefined ? "tv" : "movie",
        poster: `https://image.tmdb.org/t/p/w500/${parsed.poster_path}`,
        username: username,
      },
      headers: {
        Authorization: `${user?.username} ${user?.token}`,
        "content-type": "application/json",
      },
    });
  };

  return { handleWatch };
};
