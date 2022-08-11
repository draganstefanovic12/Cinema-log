import { CardMedia, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { PersonActedIn } from "../components/PersonActedIn";
import { useFetch } from "../hooks/useFetch";

export const Person = () => {
  const { id } = useParams();

  const data = useFetch(`http://localhost:5000/imdb/person/${id}`);

  return (
    <Container
      sx={{
        marginTop: "5rem",
        color: "#cccccc",
        backgroundColor: "#181e26",
        padding: "1rem",
      }}
    >
      {data && (
        <>
          <Grid sx={{ display: "flex" }} xs={2}>
            <CardMedia
              sx={{ width: "10rem", marginRight: "1rem" }}
              component="img"
              src={`https://image.tmdb.org/t/p/w500/${data.data.profile_path}`}
              height={200}
            />
            <Grid>
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                {data.data.name}
              </Typography>
              <Typography>{data.data.biography}</Typography>
            </Grid>
          </Grid>
          <PersonActedIn data={data} />
        </>
      )}
    </Container>
  );
};
