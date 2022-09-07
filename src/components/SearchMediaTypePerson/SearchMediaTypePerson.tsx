import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Media } from "../../types/types";

type SearchMediaProps = {
  result: {
    results: Media[];
  };
};

export const SearchMediaTypePerson = ({ result }: SearchMediaProps) => {
  const checked = result.results.find(
    (data: Media) => data.media_type === "person"
  );

  return (
    <Container>
      {checked && (
        <Typography variant="h5" sx={{ color: "#cccccc" }}>
          People:
        </Typography>
      )}
      <div
        className="search-person"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 15rem)",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        {result.results
          .filter((data: Media) => data.profile_path !== null)
          .map(
            (data: Media) =>
              data.media_type === "person" && (
                <Card
                  sx={{ width: "10em" }}
                  className="movie-card"
                  key={data.id}
                >
                  <Link
                    style={{ color: "white" }}
                    className="movie-poster-link"
                    to={`/person/${data.id}`}
                  >
                    <Grid container>
                      <Grid>
                        <CardMedia
                          className="search-person-img"
                          component="img"
                          style={{ width: "10em" }}
                          height="250"
                          src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                        ></CardMedia>
                      </Grid>
                      <Grid
                        sx={{ width: "15rem", color: "#cccccc" }}
                        className="card-grid"
                      >
                        <Typography
                          className="movie-card-name"
                          align="center"
                          variant="h5"
                        >
                          {data.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </Card>
              )
          )}
      </div>
    </Container>
  );
};
