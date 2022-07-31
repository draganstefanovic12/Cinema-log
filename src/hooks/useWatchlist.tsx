import axios from "axios";

export const useWatchlist = () => {
  const handleWatchlist = async (
    nm: string,
    poster: string,
    id: number,
    type: string,
    username: string
  ) => {
    await axios.post(`http://localhost:5000/user/watchlist/`, {
      headers: {
        "content-type": "application/json",
      },
      body: {
        name: nm,
        id: id,
        type: type,
        poster: `https://image.tmdb.org/t/p/w500/${poster}`,
        username: username,
      },
    });
  };

  const handleWatch = async (
    nm: string,
    poster: string,
    id: number,
    type: string,
    username: string
  ) => {
    await axios.post("http://localhost:5000/user/watch", {
      body: {
        name: nm,
        id: id,
        type: type,
        poster: poster,
        username: username,
      },
    });
  };

  return { handleWatchlist, handleWatch };
};
