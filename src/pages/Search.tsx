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

  const data = useFetch(`http://localhost:5000/imdb/${query.query}`);

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
                  <CardMedia>
                    <Grid>
                      <img
                        alt="poster"
                        className="poster"
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                      />
                    </Grid>
                  </CardMedia>
                  <Grid item xs={8}>
                    <Typography
                      marginTop="1em"
                      marginBottom="1em"
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
                    <Typography padding="1em" align="center" variant="body2">
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
