import { Grid, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useWatchlist } from "../hooks/useWatchlist";
import { useAuth } from "../context/AuthContext";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useEffect, useState } from "react";

interface watchlist {
  content: string;
  created: number;
  id: number;
  feed: [];
  movies: {
    watchlist: [];
  };
}

export const MediaPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const { handleWatchlist } = useWatchlist();
  const [watchlist, setWatchlist] = useState<any>();

  const data = useFetch(
    `http://localhost:5000/imdb/${params.type}/${params.id}`
  );

  //fetching user info
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.username}`)
      .then((res) => res.json())
      .then((final) => {
        setWatchlist(
          final.user.movies.watchlist.find((movie: any) =>
            data.data.original_name
              ? data.data.original_name
              : data.data.title === movie.name
          )
            ? "Remove from watchlist"
            : "Add to watchlist"
        );
      });
  }, [data]);

  return (
    <Container sx={{ color: "white" }} className="cont" maxWidth="lg">
      {data && (
        <>
          <Grid className="movie-main">
            <img
              className="backdrop"
              alt="backdrop"
              src={`https://image.tmdb.org/t/p/original/${data.data.backdrop_path}`}
            />
          </Grid>
          <Grid className="movie-info">
            <img
              alt="poster"
              className="poster-main"
              src={`https://image.tmdb.org/t/p/w500/${data.data.poster_path}`}
            />
            <Grid>
              <Typography className="movie-name" variant="h4">
                {params.type === "tv"
                  ? data.data.original_name
                  : data.data.title}{" "}
                (
                {params.type === "tv"
                  ? data.data.first_air_date.slice(0, 4)
                  : data.data.release_date.slice(0, 4)}
                )
              </Typography>
              <Typography className="movie-overview">
                {data.data.overview}
              </Typography>
              <Container
                style={{
                  display: "flex",
                  marginLeft: "0.9em",
                  width: "25em",
                }}
              >
                <ListItem button>
                  <LocalMoviesIcon sx={{ marginRight: "0.5em" }} />
                  <Typography variant="body2">Watched</Typography>
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setWatchlist(
                      watchlist === "Remove from watchlist"
                        ? "Add to favorites"
                        : "Remove from favorites"
                    );
                    handleWatchlist(
                      data.data.title === undefined
                        ? data.data.original_name
                        : data.data.title,
                      data.data.poster_path,
                      data.data.id,
                      data.data.title === undefined ? "tv" : "movie",
                      user!.username!
                    );
                  }}
                >
                  {watchlist && (
                    <>
                      <QueryBuilderIcon sx={{ marginRight: "0.5em" }} />
                      <Typography variant="body2">{watchlist}</Typography>
                    </>
                  )}
                </ListItem>
              </Container>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};
