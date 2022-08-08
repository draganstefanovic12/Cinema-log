import axios from "axios";

export const useWatchlist = () => {
  const handleWatch = async (data: any, username: string, type: string) => {
    const parsed = JSON.parse(data);
    await axios.post(`http://localhost:5000/user/${type}/`, {
      headers: {
        "content-type": "application/json",
      },
      body: {
        name: parsed.title === undefined ? parsed.original_name : parsed.title,
        id: parsed.id,
        type: parsed.title === undefined ? "tv" : "movie",
        poster: `https://image.tmdb.org/t/p/w500/${parsed.poster_path}`,
        username: username,
      },
    });
  };

  return { handleWatch };
};
