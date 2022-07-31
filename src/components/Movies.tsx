import { Card, Pagination } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

interface MoviesProps {
  movies: {
    watchlist: [];
    watched: [{ name: string; poster: string; id: number }];
  };
  user: string | undefined;
}

interface Movie {
  id: number;
  poster: string;
  name: string;
}

export const Movies = ({ movies, user }: MoviesProps) => {
  const [offset, setOffset] = useState<number>(0);
  const data = useFetch(`http://localhost:5000/user/movies/${user}/${offset}`);

  data && console.log(data);

  return (
    <Container className="profile-list-cont">
      {data && (
        <Container className="movie-grid-cont">
          {data.data.map((movie: Movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Card variant="outlined">
                <img
                  style={{ height: "15em" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
                  alt="poster"
                />
              </Card>
            </Link>
          ))}
        </Container>
      )}
      <Pagination
        hidePrevButton
        hideNextButton
        onChange={(e: any) =>
          setOffset((parseInt(e.target.textContent) - 1) * 18)
        }
        sx={{
          marginTop: "1em",
          justifyContent: "center",
        }}
        count={Math.ceil(movies.watched.length / 18)}
        shape="rounded"
      />
    </Container>
  );
};
