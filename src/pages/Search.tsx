import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { Card, CardMedia, Grid, Typography } from "@mui/material";

export interface Result {
  id: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  popularity: number;
  media_type: string;
  first_air_date: string;
}

export const Search = () => {
  const query = useParams();

  const data = useFetch(
    query.type === undefined
      ? `http://localhost:5000/imdb/${query.query}`
      : `http://localhost:5000/imdb/genre/${query.query}/${query.type}`
  );
  return (
    <div className="main-container">
      {data &&
        data.data.results
          .filter((result: Result) => {
            return result.popularity > 15;
          })
          .map((result: Result) => (
            <Card className="movie-card" key={result.id}>
              <Link
                style={{ color: "white" }}
                className="movie-poster-link"
                to={`/${result.media_type}/${result.id}`}
              >
                <Grid container>
                  <Grid>
                    <CardMedia
                      component="img"
                      height="350"
                      src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                    ></CardMedia>
                  </Grid>
                  <Grid className="card-grid" item xs={8}>
                    <Typography
                      className="movie-card-name"
                      align="center"
                      variant="h5"
                    >
                      {result.media_type === "tv" && (
                        <>
                          {result.name} {result.first_air_date.slice(0, 4)}
                        </>
                      )}
                      {result.media_type === "movie" && (
                        <>
                          {result.title} ({result.release_date.slice(0, 4)})
                        </>
                      )}
                    </Typography>
                    <Typography className="search-overview" variant="subtitle2">
                      {result.overview}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            </Card>
          ))}
    </div>
  );
};
