import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useWatchlist } from "../hooks/useWatchlist";
import { useEffect, useState } from "react";
import { Grid, ListItem, Typography } from "@mui/material";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { Genre } from "../components/Genre";
import { MediaDetails } from "../components/MediaDetails";

interface Movie {
  original_name: string;
  name: string;
}

export const MediaPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const { handleWatchlist, handleWatch } = useWatchlist();
  const [watchlist, setWatchlist] = useState<string | null>();
  const [watched, setWatched] = useState<string | null>();

  const data = useFetch(
    `http://localhost:5000/imdb/${params.type}/${params.id}`
  );

  //fetching user info
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.username}`)
      .then((res) => res.json())
      .then((final) => {
        setWatched(
          params.type === "movie"
            ? final.user.movies.watched.find(
                (movie: Movie) => data.data.title === movie.name
              )
              ? "Watched"
              : "Set as watched"
            : final.user.shows.watched.find(
                (movie: Movie) => data.data.original_name === movie.name
              )
            ? "Watched"
            : "Set as watched"
        );
        setWatchlist(
          params.type === "movie"
            ? final.user.movies.watchlist.find(
                (movie: Movie) => data.data.title === movie.name
              )
              ? "Remove from watchlist"
              : "Add to watchlist"
            : final.user.shows.watchlist.find(
                (movie: Movie) => data.data.original_name === movie.name
              )
            ? "Remove from watchlist"
            : "Add to watchlist"
        );
      });
  }, [data, params.type, user?.username]);

  return (
    <Container className="cont" maxWidth="lg">
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
            <Grid className="movie-main-information">
              <div>
                <Typography className="movie-name" variant="h4">
                  {params.type === "tv"
                    ? data.data.original_name
                    : data.data.title}{" "}
                  (
                  {params.type === "tv"
                    ? data.data.first_air_date.slice(0, 4)
                    : data.data.release_date.slice(0, 4)}
                  )
                  <Genre data={data.data} />
                </Typography>
                <Typography variant="subtitle1" className="movie-overview">
                  {data.data.overview}
                </Typography>
              </div>
              <Container className="watched-watchlist">
                {watched && (
                  <ListItem
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                      setWatched(
                        watched === "Watched" ? "Set as watched" : "Watched"
                      );
                      handleWatch(
                        data.data.title === undefined
                          ? data.data.original_name
                          : data.data.title,
                        data.data.poster_path,
                        data.data.id,
                        data.data.title === undefined ? "tv" : "movie",
                        user!.username!
                      );
                    }}
                    button
                  >
                    <LocalMoviesIcon sx={{ marginRight: "0.5em" }} />
                    <Typography variant="body2">{watched}</Typography>
                  </ListItem>
                )}
                <ListItem
                  style={{ whiteSpace: "nowrap" }}
                  disabled={watched === "Watched" ? true : false}
                  button
                  onClick={() => {
                    setWatchlist(
                      watchlist === "Remove from watchlist"
                        ? "Add to watchlist"
                        : "Remove from watchlist"
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
                      <Typography variant="body2">
                        {watched === "Watched" ? "Already watched" : watchlist}
                      </Typography>
                    </>
                  )}
                </ListItem>
              </Container>
            </Grid>
            <MediaDetails type={params.type} id={params.id} />
          </Grid>
        </>
      )}
    </Container>
  );
};
