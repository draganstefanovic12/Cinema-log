import { Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Media } from "../types/types";

export const SimilarMovies = () => {
  const [similar, setSimilar] = useState<Media[]>();
  const { userStats } = useAuth();

  const handleSimilar = async () => {
    const currMovies = userStats?.data.user.movies.watched;
    const movies = userStats?.data.user.movies.watched.slice(0, 5);
    const arr: Media[] = [];
    for (let movie in movies) {
      const data = await fetch(
        `http://localhost:5000/imdb/similar/${movies[movie].id}`
      );
      const response = await data.json();
      const filtered = response.results.filter(
        (movie: Media) => movie.vote_average > 7.5
      );
      arr.push(...filtered);
    }
    setSimilar(arr);
  };

  useEffect(() => {
    userStats && handleSimilar();
  }, [userStats]);

  return (
    <>
      <Typography variant="h5">
        Recommendations based on what you already watched
      </Typography>
      <div
        style={{
          display: "grid",
          flexDirection: "row",
          gridTemplateColumns: "repeat(5, 10em)",
        }}
      >
        {similar &&
          similar.slice(0, 10).map((movie: Media) => (
            <Link
              style={{ width: "10rem" }}
              key={movie.id}
              to={`/movie/${movie.id}`}
            >
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  component="img"
                  sx={{ width: "10rem" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  height="250"
                />
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
};