import { Card, CardMedia, Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

interface Movie {
  id: number;
  poster_path: string;
  name: string;
  media_type: string;
}

export const TrendingMovies = () => {
  const data = useFetch("http://localhost:5000/imdb/trending");
  data && console.log(data);
  const { user } = useAuth();

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
          data.data.results.slice(0, 10).map((movie: Movie) => (
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
