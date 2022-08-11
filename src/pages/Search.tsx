import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { SearchPagination } from "../components/SearchPagination";
import { Media } from "../types/types";
import { SearchMediaTypePerson } from "../components/SearchMediaTypePerson";

export const Search = () => {
  const query = useParams();
  const [offset, setOffset] = useState<number>(1);

  const data = useFetch(
    query.type === "multi"
      ? `http://localhost:5000/imdb/multi/${query.query}/`
      : `http://localhost:5000/imdb/discover/${query.query}/${query.type}/${offset}`
  );

  return (
    <div>
      <div className="main-container">
        {data &&
          data.data.results
            .filter((result: Media) => result.popularity > 6.5)
            .map((result: Media) =>
              result.media_type === "person" ? (
                <SearchMediaTypePerson result={result} />
              ) : (
                <Card className="movie-card" key={result.id}>
                  <Link
                    style={{ color: "white" }}
                    className="movie-poster-link"
                    to={`/${result.first_air_date ? "tv" : "movie"}/${
                      result.id
                    }`}
                  >
                    <Grid container>
                      <Grid>
                        <CardMedia
                          component="img"
                          style={{ width: "15em" }}
                          height="350"
                          src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        ></CardMedia>
                      </Grid>
                      <Grid className="card-grid" item xs={8}>
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
                </Card>
              )
            )}
      </div>
      {data && query.type !== "multi" && data.data.total_pages > 1 && (
        <SearchPagination setOffset={setOffset} data={data} />
      )}
    </div>
  );
};
