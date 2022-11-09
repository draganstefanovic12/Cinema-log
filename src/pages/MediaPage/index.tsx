import Genre from "./components/MediaPageGenre";
import Spinner from "@/components/Spinner";
import MediaDetails from "./components/MediaDetails";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import MediaPageRecommend from "./components/MediaPageRecommend";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { getMedia, updateUserList } from "@/features/api/backendApi";
import { Grid, ListItem, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import MediaCard from "@/components/MediaCard/MediaCard";

export const MediaPage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { type, id } = useParams();

  const { isLoading, data } = useQuery(
    ["media", type, id],
    () => {
      return getMedia(type, id);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const updateList = useMutation(updateUserList, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
    },
  });

  if (isLoading || !user) {
    return <Spinner />;
  }

  const name = type === "tv" ? data.original_name : data.title;
  const date = type === "tv" ? data.first_air_date.slice(0, 4) : data.release_date.slice(0, 4);

  const mediaType = type === "tv" ? user.shows : user.movies;
  const watchedStatus = mediaType.watched.find((media) => media.id === id);
  const watchlistStatus = mediaType.watchlist.find((media) => media.id === id);

  const updateOptions = {
    name: name,
    id: id,
    poster: data.poster_path,
  };

  return (
    <Container className="cont" maxWidth="lg" disableGutters>
      <div className="movie-main">
        <img
          className="backdrop"
          alt="backdrop"
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        />
      </div>
      <Grid className="movie-info">
        <MediaCard src={`/w500/${data.poster_path}`} style={{ width: "10rem", height: "225px" }} />
        <Grid className="movie-main-information">
          <div>
            <Typography className="movie-name" variant="h4">
              {name} ({date})
              <Genre type={type} data={data} />
            </Typography>
            <Typography variant="subtitle1" className="movie-overview">
              {data.overview}
            </Typography>
          </div>
          <Container className="watched-watchlist">
            <ListItem
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                updateList.mutate({
                  ...updateOptions,
                  update_type: type === "tv" ? "tv watched" : "movie watched",
                });
              }}
              button
            >
              <LocalMoviesIcon sx={{ marginRight: "0.5em" }} />
              <Typography className="ww-li" variant="subtitle1">
                {watchedStatus ? "Watched" : "Set as watched"}
              </Typography>
            </ListItem>
            <ListItem
              style={{
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                updateList.mutate({
                  ...updateOptions,
                  update_type: type === "tv" ? "tv watchlist" : "movie watchlist",
                });
              }}
              button
            >
              <QueryBuilderIcon sx={{ marginRight: "0.5em" }} />
              <Typography className="ww-li" variant="subtitle1" onClick={() => {}}>
                {watchlistStatus ? "Remove from watchlist" : "Add to watchlist"}
              </Typography>
            </ListItem>
            <MediaPageRecommend params={type} media={data} />
          </Container>
        </Grid>
      </Grid>
      <MediaDetails credits={data.credits} />
    </Container>
  );
};
