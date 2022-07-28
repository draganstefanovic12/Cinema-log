import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const MediaPage = () => {
  const params = useParams();

  const data = useFetch(
    `http://localhost:5000/imdb/${params.type}/${params.id}`
  );

  console.log(data);
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
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};
