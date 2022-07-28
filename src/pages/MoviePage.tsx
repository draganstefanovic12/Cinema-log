import { Image } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const MoviePage = () => {
  const params = useParams();
  console.log(params);
  const data = useFetch(params.id!);
  return (
    <Container>
      <Grid>
        <Image />
        <Typography></Typography>
      </Grid>
    </Container>
  );
};
