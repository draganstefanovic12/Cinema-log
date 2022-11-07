import { useNavigate } from "react-router-dom";
import { CrewArr, OtherCrew } from "../types";
import { Avatar, Container, Typography } from "@mui/material";

const Crew = ({ crew }: CrewArr) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography className="crew-actors" variant="h6">
        Crew
      </Typography>
      <div className="crew-cont actors">
        <Container className="crew actor-cont">
          {crew &&
            crew!
              .filter((director: OtherCrew) => director.known_for_department === "Directing")
              .slice(0, 1)
              .map((crew: OtherCrew) => (
                <Container className="actor-cont svg" key={crew.id} disableGutters>
                  <Avatar
                    onClick={() => navigate(`/person/${crew.id}`)}
                    variant="square"
                    className="crew-avatar"
                    src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`}
                  />
                  <Container>
                    <Typography
                      className="crew-name"
                      onClick={() => navigate(`/person/${crew.id}`)}
                      noWrap
                    >
                      {crew.name}
                    </Typography>
                    <Typography className="actor-movie-name" variant="subtitle1">
                      Director
                    </Typography>
                  </Container>
                </Container>
              ))}
        </Container>
      </div>
    </Container>
  );
};

export default Crew;
