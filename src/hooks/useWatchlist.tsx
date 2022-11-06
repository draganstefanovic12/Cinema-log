import axios from "../features/api/backendApi";
import { useAuth } from "@/features/auth/context/AuthContext";

export const useWatchlist = () => {
  const { auth, user } = useAuth();

  const handleWatch = async (data: any, username: string, type: string) => {
    const parsed = JSON.parse(data);
    await axios(`/user/${type}/`, {
      method: "POST",
      data: {
        name: parsed.title === undefined ? parsed.original_name : parsed.title,
        id: parsed.id,
        type: parsed.title === undefined ? "tv" : "movie",
        poster: `https://image.tmdb.org/t/p/w500/${parsed.poster_path}`,
        username: username,
      },
      headers: {
        Authorization: `${user?.username} ${auth?.token}`,
        "content-type": "application/json",
      },
    });
  };

  return { handleWatch };
};
