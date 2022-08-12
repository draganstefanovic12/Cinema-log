import { Genre } from "../components/Genre";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { MediaDetails } from "../components/MediaDetails";
import { useWatchlist } from "../hooks/useWatchlist";
import { useEffect, useState } from "react";
import { Grid, ListItem, Typography } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { MediaPageRecommend } from "../components/MediaPageRecommend";

export const MediaPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const { handleWatch } = useWatchlist();
  const [watchlist, setWatchlist] = useState<string | null>();
  const [watched, setWatched] = useState<string | null>();

  const data = useFetch(
    `http://localhost:5000/imdb/${params.type}/${params.id}`
  );

  //fetching user info
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.username}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((final) => {
        setWatched(
          params.type === "movie"
            ? final.user.movies.watched.find(
                (movie: { title: string; name: string }) =>
                  data.data.title === movie.name
              )
              ? "Watched"
              : "Set as watched"
            : final.user.shows.watched.find(
                (movie: { title: string; name: string }) =>
                  data.data.original_name === movie.name
              )
            ? "Watched"
            : "Set as watched"
        );
        setWatchlist(
          params.type === "movie"
            ? final.user.movies.watchlist.find(
                (movie: { title: string; name: string }) =>
                  data.data.title === movie.name
              )
              ? "Remove from watchlist"
              : "Add to watchlist"
            : final.user.shows.watchlist.find(
                (movie: { title: string; name: string }) =>
                  data.data.original_name === movie.name
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
                  <Genre type={params.type} data={data.data} />
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
                        JSON.stringify(data.data),
                        user!.username!,
                        "watch"
                      );
                    }}
                    button
                  >
                    <LocalMoviesIcon sx={{ marginRight: "0.5em" }} />
                    <Typography variant="subtitle1">{watched}</Typography>
                  </ListItem>
                )}
                <ListItem
                  style={{
                    whiteSpace: "nowrap",
                    display: watchlist ? "flex" : "none",
                  }}
                  disabled={watched === "Watched" ? true : false}
                  button
                  onClick={() => {
                    setWatchlist(
                      watchlist === "Remove from watchlist"
                        ? "Add to watchlist"
                        : "Remove from watchlist"
                    );
                    handleWatch(
                      JSON.stringify(data.data),
                      user!.username!,
                      "watchlist"
                    );
                  }}
                >
                  {watchlist && (
                    <>
                      <QueryBuilderIcon sx={{ marginRight: "0.5em" }} />
                      <Typography variant="subtitle1">
                        {watched === "Watched" ? "Already watched" : watchlist}
                      </Typography>
                    </>
                  )}
                </ListItem>
                <MediaPageRecommend params={params.type} media={data.data} />
              </Container>
            </Grid>
          </Grid>
          {data && <MediaDetails credits={data.data.credits} />}
        </>
      )}
    </Container>
  );
};
