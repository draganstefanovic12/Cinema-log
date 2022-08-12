import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Card, CardMedia, Typography } from "@mui/material";
import { HomepageMovieCardsProps, Media } from "../types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const HomepageMovieCards = ({
  query,
  name,
}: HomepageMovieCardsProps) => {
  const [data, setData] = useState<any>();

  const handleCards = async () => {
    const data = await fetch(query);
    const response = await data.json();
    setData(response);
  };

  useEffect(() => {
    handleCards();
  }, []);

  return (
    <div style={{ gridRow: "2", gridColumn: "1" }}>
      <Typography
        variant="h5"
        sx={{ color: "#cccccc", marginBottom: "0.5rem", paddingTop: "1rem" }}
      >
        {name}
      </Typography>
      <div
        style={{
          display: "grid",
          flexDirection: "row",
          gridTemplateColumns: "repeat(5, 10em)",
        }}
      >
        {data &&
          data.results.slice(0, 10).map((movie: Media) => (
            <Link
              style={{ width: "10rem" }}
              key={movie.id}
              to={`/movie/${movie.id}`}
            >
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-link-img"
                  component="img"
                  sx={{ width: "10rem", backgroundColor: "#161b22" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  height="250"
                />
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};
