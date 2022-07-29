import axios from "axios";

export const useWatchlist = () => {
  const handleWatchlist = async (
    nm: string,
    poster: string,
    username: string
  ) => {
    await axios.post(`http://localhost:5000/user/watchlist/`, {
      method: "POST",
      body: {
        name: nm,
        poster: `https://image.tmdb.org/t/p/w500/${poster}`,
        username: username,
      },
    });
  };

  return { handleWatchlist };
};
