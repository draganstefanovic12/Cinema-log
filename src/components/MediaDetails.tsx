import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFetch } from "../hooks/useFetch";

interface MovieDetailsProps {
  type: string | undefined;
  id: string | undefined;
}

export const MediaDetails = ({ type, id }: MovieDetailsProps) => {
  const data = useFetch(`http://localhost:5000/imdb/cast/${type}/${id}/`);
  data && console.log(data);

  return (
    <Container>
      <Typography></Typography>
    </Container>
  );
};
