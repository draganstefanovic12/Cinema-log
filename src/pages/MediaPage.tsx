import { Image } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const MediaPage = () => {
  const params = useParams();

  const data = useFetch(
    `http://localhost:5000/imdb/${params.type}/${params.id}`
  );

  return (
    <Container maxWidth="lg">
      {data && (
        <>
          <Grid className="movie-main">
            <img
              alt="backdrop"
              src={`https://image.tmdb.org/t/p/original/${data.data.backdrop_path}`}
            />
          </Grid>
        </>
      )}
    </Container>
  );
};
