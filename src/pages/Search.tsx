import { Media } from "../types/types";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { SearchUsers } from "../components/SearchUsers";
import { SearchLists } from "../components/SearchLists";
import { Link, useParams } from "react-router-dom";
import { SearchPagination } from "../components/SearchPagination";
import { SearchMediaTypePerson } from "../components/SearchMediaTypePerson";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

export const Search = () => {
  const query = useParams();
  const [offset, setOffset] = useState<number>(1);

  const data = useFetch(
    query.type === "multi"
      ? `https://media-log.herokuapp.com/imdb/multi/${query.query}/`
      : `https://media-log.herokuapp.com/imdb/discover/${query.query}/${query.type}/${offset}`
  );

  return (
    <div>
      <div className="main-container">
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
                          height="350"
                          src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        ></CardMedia>
                      </Grid>
                      <Grid className="card-grid" item xs={8.2}>
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
      </div>
      {query.query === "alllists" && <SearchLists />}
      {data && query.type !== "multi" && data.data.total_pages > 1 && (
        <SearchPagination setOffset={setOffset} data={data} />
      )}
      <SearchUsers query={query.query} />
      {data && <SearchMediaTypePerson result={data.data} />}
    </div>
  );
};
