import { Avatar, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFetch } from "../hooks/useFetch";

interface MovieDetailsProps {
  type: string | undefined;
  id: string | undefined;
}

interface Cast {
  name: string;
  profile_path: string;
  character: string;
}

export const MediaDetails = ({ type, id }: MovieDetailsProps) => {
  const data = useFetch(`http://localhost:5000/imdb/cast/${type}/${id}/`);
  data && console.log(data);

  return (
    <>
      <Typography variant="h5" sx={{ marginLeft: "1em", paddingTop: "0.5em" }}>
        Actors
      </Typography>
      <div className="actors">
        {data &&
          data.data.cast.slice(0, 10).map((cast: Cast) => (
            <Container className="actor-cont">
              <Avatar
                variant="square"
                className="actor-avatar"
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              />
              <Container>
                <Typography>{cast.name}</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#cccccc" }}
                  noWrap
                >
                  ({cast.character})
                </Typography>
              </Container>
            </Container>
          ))}
      </div>
    </>
  );
};
