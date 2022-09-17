import "./styles/search.css";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Media } from "../../types/types";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import SearchLists from "../../components/SearchLists";
import SearchUsers from "../../components/SearchUsers";
import SearchPagination from "../../components/SearchPagination";
import SearchMediaTypePerson from "../../components/SearchMediaTypePerson";

export const Search = () => {
  const query = useParams();
  const [offset, setOffset] = useState<number>(1);

  //if a user is searching for a specific movie/show/user its gonna be multi. otherwise by genre
  const data = useFetch(
    query.type === "multi"
      ? `https://media-log.herokuapp.com/imdb/multi/${query.query}/`
      : `https://media-log.herokuapp.com/imdb/discover/${query.query}/${query.type}/${offset}`
  );

  const checker =
    data &&
    data.data.results.find(
      (result: Media) =>
        result.media_type === "tv" || result.media_type === "movie"
    );

  return (
    <div>
      <Container className="main-container">
        {checker && (
          <Typography
            variant="h5"
            sx={{ color: "#cccccc", marginBottom: "0.4rem" }}
          >
            Media:
          </Typography>
        )}
        {data &&
          data.data.results
            .filter(
              (result: Media) =>
                result.popularity > 6.5 &&
                (result.title || result.first_air_date)
            )
            .map((result: Media) => (
              <Card className="movie-card" key={result.id}>
                <CardContent
                  sx={{ backgroundColor: "#161b22" }}
                  className="movie-card"
                >
                  <Link
                    style={{ color: "white" }}
                    className="movie-poster-link"
                    to={`/${result.first_air_date ? "tv" : "movie"}/${
                      result.id
                    }`}
                  >
                    <Grid className="search-main-grid" container>
                      <Grid className="search-img-grid">
                        <CardMedia
                          className="search-img"
                          component="img"
                          height="250"
                          src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        ></CardMedia>
                      </Grid>
                      <Grid className="card-grid" item xs={9.4}>
                        <Typography
                          className="movie-card-name"
                          align="center"
                          variant="h5"
                        >
                          {result.first_air_date ? (
                            <>
                              {result.name} ({result.first_air_date.slice(0, 4)}
                              )
                            </>
                          ) : (
                            <>
                              {result.title} ({result.release_date.slice(0, 4)})
                            </>
                          )}
                        </Typography>
                        <Typography
                          className="search-overview"
                          variant="subtitle2"
                        >
                          {result.overview}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </CardContent>
              </Card>
            ))}
      </Container>
      {query.query === "alllists" && <SearchLists />}
      {data && query.type !== "multi" && data.data.total_pages > 1 && (
        <SearchPagination setOffset={setOffset} data={data} />
      )}
      <SearchUsers query={query.query} />
      {data && <SearchMediaTypePerson result={data.data} />}
    </div>
  );
};
