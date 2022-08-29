import { Card, CardMedia, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Media } from "../types/types";

export const SimilarMovies = () => {
  const [similar, setSimilar] = useState<Media[]>();
  const { userStats } = useAuth();

  useEffect(() => {
    const handleSimilar = async () => {
      const movies = userStats!.movies.watched;

      const data = await fetch(
        `https://media-log.herokuapp.com/imdb/similar/${
          movies[Math.floor(Math.random() * movies.length)].id
        }`
      );
      const response = await data.json();
      const filtered = response.results.filter(
        (movie: Media) => movie.vote_average > 6.9
      );
      setSimilar(filtered);
    };

    userStats && handleSimilar();
  }, [userStats]);

  return (
    <>
      <Typography sx={{ marginBottom: "0.5rem" }} variant="h5">
        Recommendations based on what you already watched
      </Typography>
      <div
        className="similar"
        style={{
          display: "grid",
          flexDirection: "row",
          gridTemplateColumns: "repeat(auto-fill, 10em)",
          gridTemplateRows: "repeat(auto-fill, 15.9em)",
        }}
      >
        {similar ? (
          similar.slice(0, 10).map((movie: Media) => (
            <Link
              style={{ width: "10rem" }}
              key={movie.id}
              to={`/movie/${movie.id}`}
            >
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-link-img movie-card-link"
                  component="img"
                  sx={{ width: "10rem" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  height="250"
                />
              </Card>
            </Link>
          ))
        ) : (
          <Skeleton
            sx={{ bgcolor: "#161b22" }}
            animation="wave"
            variant="rectangular"
            height="10rem"
            width="50rem"
          />
        )}
      </div>
    </>
  );
};
