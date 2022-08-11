import { Avatar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Actors, CastArr } from "../types/types";

export const Cast = ({ cast }: CastArr) => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h5" sx={{ marginLeft: "1em", paddingTop: "0.5em" }}>
        Actors
      </Typography>
      <div className="actors">
        {cast.slice(0, 10).map((cast: Actors) => (
          <Container className="actor-cont">
            <Avatar
              onClick={() => navigate(`/person/${cast.id}`)}
              variant="square"
              className="actor-avatar"
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
            />
            <Container>
              <Typography onClick={() => navigate(`/person/${cast.id}`)}>
                {cast.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#cccccc" }} noWrap>
                {cast.character}
              </Typography>
            </Container>
          </Container>
        ))}
      </div>
    </div>
  );
};
