import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";

type SearchMediaProps = {
  result: {
    results: Media[];
  };
};

const SearchMediaTypePerson = ({ result }: SearchMediaProps) => {
  return (
    <Container className="search-person-container">
      <Typography className="head" variant="h5">
        People:
      </Typography>
      <div className="search-person">
        {result.results
          .filter((data: Media) => data.profile_path !== null)
          .map(
            (data: Media) =>
              data.media_type === "person" && (
                <Card className="movie-card" key={data.id}>
                  <Link className="movie-poster-link" to={`/person/${data.id}`}>
                    <Grid container>
                      <Grid>
                        <CardMedia
                          className="search-person-img"
                          component="img"
                          height="250"
                          src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                        ></CardMedia>
                      </Grid>
                    </Grid>
                    <Typography className="movie-card-name" align="center" variant="h5">
                      {data.name}
                    </Typography>
                  </Link>
                </Card>
              )
          )}
      </div>
    </Container>
  );
};

export default SearchMediaTypePerson;
