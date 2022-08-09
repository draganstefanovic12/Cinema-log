import { Card, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Media } from "../types/types";

export const TrendingMovies = () => {
  const data = useFetch("http://localhost:5000/imdb/trending");

  return (
    <div style={{ gridRow: "2", gridColumn: "1" }}>
      <Typography variant="h5" sx={{ color: "#cccccc" }}>
        Trending Movies
      </Typography>
      <div
        style={{
          display: "grid",
          flexDirection: "row",
          gridTemplateColumns: "repeat(5, 10em)",
        }}
      >
        {data &&
          data.data.results.slice(0, 10).map((movie: Media) => (
            <Link
              style={{ width: "10rem" }}
              key={movie.id}
              to={`/${movie.media_type}/${movie.id}`}
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
    </div>
  );
};
