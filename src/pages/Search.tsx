import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { Card, CardMedia, Grid, Pagination, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { HelmetTitle } from "../components/HelmetTitle";

export interface Result {
  id: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  popularity: number;
  media_type: string;
  first_air_date: string;
}

export const Search = () => {
  const query = useParams();
  const [offset, setOffset] = useState<number>(1);

  const data = useFetch(
    query.type === "multi"
      ? `http://localhost:5000/imdb/${query.query}`
      : `http://localhost:5000/imdb/discover/${query.query}/${query.type}/${offset}`
  );

  return (
    <div>
      <HelmetTitle title={"Search"} />
      <div className="main-container">
        {data &&
          data.data.results
            .filter((result: Result) => {
              return result.popularity > 6.5;
            })
            .map((result: Result) => (
              <Card className="movie-card" key={result.id}>
                <Link
                  style={{ color: "white" }}
                  className="movie-poster-link"
                  to={`/${result.first_air_date ? "tv" : "movie"}/${result.id}`}
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
                            {result.name} ({result.first_air_date.slice(0, 4)})
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
            ))}
      </div>
      {data && data.data.total_pages > 1 && (
        <Pagination
          className="pagination"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
          hidePrevButton
          hideNextButton
          count={data.data.total_pages}
          onChange={(e: any) => {
            setOffset(parseInt(e.target.textContent));
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 200);
          }}
          shape="rounded"
        />
      )}
    </div>
  );
};
