import { Grid, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useWatchlist } from "../hooks/useWatchlist";
import { useAuth } from "../context/AuthContext";

export const MediaPage = () => {
  const { handleWatchlist } = useWatchlist();
  const params = useParams();
  const { user } = useAuth();

  const data = useFetch(
    `http://localhost:5000/imdb/${params.type}/${params.id}`
  );

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
                  onClick={() =>
                    handleWatchlist(
                      data.data.title,
                      data.data.poster_path,
                      user!.username!
                    )
                  }
                >
                  <QueryBuilderIcon sx={{ marginRight: "0.5em" }} />
                  <Typography variant="body2">Add to watchlist</Typography>
                </ListItem>
              </Container>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};
