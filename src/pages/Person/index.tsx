import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { fetchMediaPerson } from "@/features/api/backendApi";
import { CardMedia, Grid, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import PersonActedIn from "./components/PersonActedIn";

export const Person = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery(
    ["person", id],
    () => {
      return fetchMediaPerson(id);
    },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="person-cont">
      <Grid className="person-cont-grid">
        <CardMedia
          sx={{ width: "10rem", marginRight: "1rem", float: "left" }}
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
          height={200}
        />
        <Grid className="person-cont-text">
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
            {data.name}
          </Typography>
          <Typography sx={{ color: "#768697" }}>{data.biography}</Typography>
        </Grid>
      </Grid>
      <PersonActedIn data={data} />
    </Container>
  );
};
