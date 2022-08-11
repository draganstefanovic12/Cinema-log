import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const SearchMediaTypePerson = ({ result }: any) => {
  return (
    <Card sx={{ width: "15em" }} className="movie-card" key={result.id}>
      <Link
        style={{ color: "white" }}
        className="movie-poster-link"
        to={`/person/${result.id}`}
      >
        <Grid container>
          <Grid>
            <CardMedia
              component="img"
              style={{ width: "15em" }}
              height="350"
              src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`}
            ></CardMedia>
          </Grid>
          <Grid sx={{ width: "15rem", color: "#cccccc" }} className="card-grid">
            <Typography className="movie-card-name" align="center" variant="h5">
              {result.name}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
};
