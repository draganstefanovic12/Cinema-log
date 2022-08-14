import { Avatar, Container, Typography } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CrewArr, OtherCrew } from "../types/types";

export const Crew = ({ crew }: CrewArr) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Typography
        className="crew-actors"
        variant="h5"
        sx={{ marginLeft: "1em", paddingTop: "0.5em" }}
      >
        Crew
      </Typography>
      <div className="crew-cont actors">
        <Container className="crew actor-cont">
          {crew &&
            crew!
              .filter(
                (director: OtherCrew) =>
                  director.known_for_department === "Directing"
              )
              .slice(0, 1)
              .map((crew: OtherCrew) => (
                <Fragment key={crew.id}>
                  <Avatar
                    onClick={() => navigate(`/person/${crew.id}`)}
                    variant="square"
                    className="crew-avatar actor-avatar"
                    src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`}
                  />
                  <Container>
                    <Typography
                      className="crew-name actor-name actor-movie-name"
                      onClick={() => navigate(`/person/${crew.id}`)}
                      sx={{ color: "#fff" }}
                      noWrap
                    >
                      {crew.name}
                    </Typography>
                    <Typography
                      className="actor-movie-name"
                      variant="subtitle1"
                      sx={{ color: "#cccccc" }}
                    >
                      Director
                    </Typography>
                  </Container>
                </Fragment>
              ))}
        </Container>
      </div>
    </Container>
  );
};
