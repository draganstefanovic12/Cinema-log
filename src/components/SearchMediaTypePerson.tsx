import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Media } from "../types/types";

export const SearchMediaTypePerson = ({ result }: any) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 20rem)",
          gap: "1rem",
          padding: "8rem",
        }}
      >
        {result.results
          .filter((data: Media) => data.profile_path !== null)
          .map(
            (data: Media) =>
              data.media_type === "person" && (
                <Card
                  sx={{ width: "15em" }}
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
                          component="img"
                          style={{ width: "15em" }}
                          height="350"
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
    </>
  );
};
