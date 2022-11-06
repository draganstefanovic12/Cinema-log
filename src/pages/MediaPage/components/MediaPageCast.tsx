import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Actors, CastArr } from "../types";
import { Avatar, Typography } from "@mui/material";

const Cast = ({ cast }: CastArr) => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography className="crew-actors" variant="h6">
        Actors
      </Typography>
      <div className="actors">
        {cast.slice(0, 10).map((cast: Actors) => (
          <Container key={cast.id} className="actor-cont">
            <Avatar
              onClick={() => navigate(`/person/${cast.id}`)}
              variant="square"
              className="actor-avatar svg"
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
            />
            <Container>
              <Typography className="actor-name svg" onClick={() => navigate(`/person/${cast.id}`)}>
                {cast.name}
              </Typography>
              <Typography className="actor-movie-name" variant="subtitle1" noWrap>
                {cast.character}
              </Typography>
            </Container>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default Cast;
