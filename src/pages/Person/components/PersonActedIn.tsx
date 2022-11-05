import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Actors, Media, OtherCrew } from "@/types/types";
import { Card, CardMedia, Grid, ListItem, Typography } from "@mui/material";

type PersonActedInProps = {
  data: {
    data: Actors & OtherCrew;
  };
};

const PersonActedIn = ({ data }: PersonActedInProps) => {
  const [type, setType] = useState<Media[] | null>(null);

  useEffect(() => {
    data.data.known_for_department === "Acting"
      ? setType(data.data.combined_credits.cast)
      : setType(data.data.combined_credits.crew);
  }, [
    data.data.combined_credits.cast,
    data.data.combined_credits.crew,
    data.data.known_for_department,
  ]);

  return (
    <>
      <Grid sx={{ marginTop: "3rem", display: "flex", width: "5rem" }}>
        {data.data.combined_credits.cast.length > 5 && (
          <ListItem
            onClick={() => setType(data.data.combined_credits.cast)}
            button
            sx={{
              marginLeft: "1.7rem",
              backgroundColor:
                type !== null && type === data.data.combined_credits.cast ? "#161b22" : "#181e26",
            }}
          >
            Actor
          </ListItem>
        )}
        {data.data.combined_credits.crew.length > 5 && (
          <ListItem
            sx={{
              backgroundColor:
                type !== null && type === data.data.combined_credits.crew ? "#161b22" : "#181e26",
            }}
            onClick={() => setType(data.data.combined_credits.crew)}
            button
          >
            Director
          </ListItem>
        )}
      </Grid>
      <Container className="person-cards">
        {type &&
          type
            .filter((acted: Media) =>
              acted.character
                ? !acted.character.includes("Self") &&
                  !acted.character.includes("Himself") &&
                  !acted.character.includes("archive") &&
                  acted.popularity > 10 &&
                  acted.poster_path !== null &&
                  acted.character !== ""
                : acted.poster_path !== null && acted.job === "Director"
            )
            .sort((a: Media, b: Media) => b.popularity - a.popularity)
            .slice(0, 20)
            .map((acted: Media) => (
              <Link
                style={{
                  width: "10rem",
                  height: "19rem",
                }}
                key={acted.id}
                to={`/${acted.media_type}/${acted.id}`}
              >
                <Card className="movie-card-link" variant="outlined">
                  <CardMedia
                    sx={{ width: "10rem" }}
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500/${acted.poster_path}`}
                    height="250"
                  />
                </Card>
                <Typography align="center" sx={{ color: "#fff" }}>
                  {acted.name} {acted.title}
                </Typography>
                <Typography align="center" sx={{ color: "#cccccc" }}>
                  {acted.character}
                </Typography>
              </Link>
            ))}
      </Container>
    </>
  );
};

export default PersonActedIn;
