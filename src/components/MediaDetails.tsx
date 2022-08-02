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

interface Director {
  known_for_department: string;
  name: string;
  profile_path: string;
}

export const MediaDetails = ({ type, id }: MovieDetailsProps) => {
  const data = useFetch(`http://localhost:5000/imdb/cast/${type}/${id}/`);
  data && console.log(data);

  return (
    <div className="cast-crew-cont">
      <div>
        <Typography
          variant="h5"
          sx={{ marginLeft: "1em", paddingTop: "0.5em" }}
        >
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
      </div>
      <Container>
        <Typography
          variant="h5"
          sx={{ marginLeft: "1em", paddingTop: "0.5em" }}
        >
          Crew
        </Typography>
        <div className="crew-cont">
          {data &&
            data.data.crew
              .filter(
                (director: Director) =>
                  director.known_for_department === "Directing" ||
                  director.known_for_department === "Writing"
              )
              .slice(0, 3)
              .map((director: Director) => (
                <Container className="crew">
                  <Avatar
                    variant="square"
                    className="crew-avatar"
                    src={`https://image.tmdb.org/t/p/w500/${director.profile_path}`}
                  />
                  <Container>
                    <Typography sx={{ color: "#fff" }} noWrap>
                      {director.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#cccccc" }}>
                      {director.known_for_department}
                    </Typography>
                  </Container>
                </Container>
              ))}
        </div>
      </Container>
    </div>
  );
};
