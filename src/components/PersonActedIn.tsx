import {
  Card,
  CardMedia,
  Grid,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Media } from "../types/types";

export const PersonActedIn = ({ data }: any) => {
  const [type, setType] = useState<any>(null);

  useEffect(() => {
    data.data.known_for_department === "Acting"
      ? setType(data.data.combined_credits.cast)
      : setType(data.data.combined_credits.crew);
  }, []);

  return (
    <>
      <Grid sx={{ marginTop: "1rem", display: "flex", width: "5rem" }}>
        {data.data.combined_credits.cast.length > 5 && (
          <ListItem
            onClick={() => setType(data.data.combined_credits.cast)}
            button
            sx={{
              marginLeft: "1.7rem",
              backgroundColor:
                type !== null && data.data.combined_credits.cast
                  ? "#161b22"
                  : "#181e26",
            }}
          >
            Actor
          </ListItem>
        )}
        {data.data.combined_credits.crew.length > 5 && (
          <ListItem
            sx={{
              backgroundColor:
                type === data.data.combined_credits.crew
                  ? "#161b22"
                  : "#181e26",
            }}
            onClick={() => setType(data.data.combined_credits.crew)}
            button
          >
            Director
          </ListItem>
        )}
      </Grid>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 13rem)",
          backgroundColor: "#161b22",
          justifyContent: "center",
          paddingTop: "1.5rem",
        }}
      >
        {type ? (
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
            .slice(0, 40)
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
            ))
        ) : (
          <Skeleton
            variant="rectangular"
            height={1500}
            width={1000}
            sx={{ bgcolor: "#181e26" }}
          />
        )}
      </Container>
    </>
  );
};
