import { Card, CardMedia, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

interface Movies {
  poster_path: string;
  name: string;
  id: string;
}

export const FavoriteMovies = ({ movies }: any) => {
  console.log(movies);
  return (
    <Container className="favorite-container">
      <Typography className="favorite-movies" variant="h5">
        Favorite Movies
      </Typography>
      <Card className="favorite-container-card">
        {movies.map((movie: Movies) => (
          <Link to={`/movie/${movie.id}`}>
            <CardMedia
              component="img"
              height="250"
              style={{ width: "11em" }}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          </Link>
        ))}
      </Card>
    </Container>
  );
};
