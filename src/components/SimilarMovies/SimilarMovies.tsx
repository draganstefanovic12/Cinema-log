import "./styles/similarmovies.css";
import { Link } from "react-router-dom";
import { Media } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Card, CardMedia, Skeleton, Typography } from "@mui/material";

const SimilarMovies = () => {
  const [similar, setSimilar] = useState<Media[]>();
  const { userStats } = useAuth();

  useEffect(() => {
    const handleSimilar = async () => {
      const movies = userStats!.movies.watched;

      //Gets a random movies from users watched list and fetches similar movies
      const data = await fetch(
        `https://dragpersonalproj.xyz/cinema-log/imdb/recommendations/${
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
      <div className="similar">
        {similar ? (
          similar.slice(0, 10).map((movie: Media) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-link-img"
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

export default SimilarMovies;
