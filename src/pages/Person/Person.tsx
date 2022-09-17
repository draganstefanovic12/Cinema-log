import "./styles/person.css";
import { useFetch } from "../../hooks/useFetch";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import PersonActedIn from "../../components/PersonActedIn";
import { CardMedia, CircularProgress, Grid, Typography } from "@mui/material";

export const Person = () => {
  const { id } = useParams();

  const data = useFetch(`https://media-log.herokuapp.com/imdb/person/${id}`);

  return (
    <>
      {data ? (
        <Container className="person-cont">
          <Grid className="person-cont-grid">
            <CardMedia
              sx={{ width: "10rem", marginRight: "1rem", float: "left" }}
              component="img"
              src={`https://image.tmdb.org/t/p/w500/${data.data.profile_path}`}
              height={200}
            />
            <Grid className="person-cont-text">
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                {data.data.name}
              </Typography>
              <Typography>{data.data.biography}</Typography>
            </Grid>
          </Grid>
          <PersonActedIn data={data} />
        </Container>
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
};
