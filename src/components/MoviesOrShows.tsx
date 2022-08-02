import { Card, CardMedia, Pagination } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

interface MoviesProps {
  movies: {
    watchlist: [];
    watched: [{ name: string; poster: string; id: number }];
  };
  type: string | undefined;
  user: string | undefined;
}

interface Movie {
  id: number;
  poster: string;
  name: string;
}

export const MoviesOrShows = ({ movies, type, user }: MoviesProps) => {
  const [offset, setOffset] = useState<number>(0);
  const data = useFetch(
    `http://localhost:5000/user/${type}/${user}/${offset}/${type}`
  );

  return (
    <Container className="profile-list-cont">
      {data && (
        <Container className="movie-grid-cont">
          {data.data.map((movie: Movie) => (
            <Link key={movie.id} to={`/${type}/${movie.id}`}>
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
                  height="250"
                />
              </Card>
            </Link>
          ))}
        </Container>
      )}
      <Pagination
        className="pagination"
        hidePrevButton
        hideNextButton
        onChange={(e: any) => {
          setOffset((parseInt(e.target.textContent) - 1) * 18);
        }}
        count={Math.ceil(movies.watched.length / 18)}
        shape="rounded"
      />
    </Container>
  );
};
