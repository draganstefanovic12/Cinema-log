import { Avatar, Container, Typography } from "@mui/material";

interface Data {
  data: {
    data: {
      crew: [];
    };
  };
}

interface Crew {
  known_for_department: string;
  name: string;
  profile_path: string;
}

export const Crew = ({ data }: Data) => {
  return (
    <Container>
      <Typography variant="h5" sx={{ marginLeft: "1em", paddingTop: "0.5em" }}>
        Crew
      </Typography>
      <div className="crew-cont">
        {data &&
          data.data.crew
            .filter(
              (director: Crew) =>
                director.known_for_department === "Directing" ||
                director.known_for_department === "Writing"
            )
            .slice(0, 3)
            .map((director: Crew) => (
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
  );
};
