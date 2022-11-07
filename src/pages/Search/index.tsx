import { Media } from "../MediaPage/types";
import { search } from "@/features/api/backendApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import SearchLists from "./components/SearchLists";
import SearchUsers from "./components/SearchUsers";
import SearchPagination from "./components/SearchPagination";
import SearchMediaTypePerson from "./components/SearchMediaTypePerson";

export const Search = () => {
  const query = useParams();
  const [offset, setOffset] = useState<number>(1);

  const searchQuery =
    query.type === "multi"
      ? `/multi/${query.query}/`
      : `/discover/${query.query}/${query.type}/${offset}`;

  const { isLoading, data } = useQuery(["search", query], () => {
    return search(searchQuery);
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Container className="search-container">
        {data.results.length > 0 && data.results[0].id && (
          <Typography className="search-container-media-text" variant="h5">
            Media:
          </Typography>
        )}
        {data.results
          .filter(
            (result: Media) => result.popularity > 6.5 && (result.title || result.first_air_date)
          )
          .map(
            ({ id, first_air_date, release_date, poster_path, overview, name, title }: Media) => (
              <Card className="movie-card" key={id}>
                <CardContent className="movie-card">
                  <Link
                    className="movie-poster-link"
                    to={`/${first_air_date ? "tv" : "movie"}/${id}`}
                  >
                    <Grid className="search-main-grid" container>
                      <Grid className="search-img-grid">
                        <CardMedia
                          className="search-img"
                          component="img"
                          height="250"
                          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        ></CardMedia>
                      </Grid>
                      <Grid className="card-grid" item xs={9.4}>
                        <Typography className="movie-card-name" align="center" variant="h5">
                          {first_air_date ? (
                            <>
                              {name} ({first_air_date.slice(0, 4)})
                            </>
                          ) : (
                            <>
                              {title} ({release_date.slice(0, 4)})
                            </>
                          )}
                        </Typography>
                        <Typography className="search-overview" variant="subtitle2">
                          {overview}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </CardContent>
              </Card>
            )
          )}
      </Container>
      {query.query === "alllists" && <SearchLists />}
      {query.type !== "multi" && data.total_pages > 1 && (
        <SearchPagination setOffset={setOffset} data={data} />
      )}
      <SearchUsers query={query.query} />
      {<SearchMediaTypePerson result={data} />}
    </div>
  );
};
