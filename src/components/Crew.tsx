import { Avatar, Container, Typography } from "@mui/material";
import { Data, OtherCrew } from "../types/types";

export const Crew = ({ data }: Data) => {
  return (
    <Container>
      <Typography variant="h5" sx={{ marginLeft: "1em", paddingTop: "0.5em" }}>
        Crew
      </Typography>
      <div className="crew-cont">
        <Container className="crew">
          {data &&
            data.data
              .crew!.filter(
                (director: OtherCrew) =>
                  director.known_for_department === "Directing"
              )
              .slice(0, 1)
              .map((crew: OtherCrew) => (
                <>
                  <Avatar
                    variant="square"
                    className="crew-avatar"
                    src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`}
                  />
                  <Container>
                    <Typography sx={{ color: "#fff" }} noWrap>
                      {crew.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#cccccc" }}>
                      Director
                    </Typography>
                  </Container>
                </>
              ))}
        </Container>
      </div>
    </Container>
  );
};
