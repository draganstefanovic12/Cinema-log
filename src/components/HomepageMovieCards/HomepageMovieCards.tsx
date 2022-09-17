import { Media } from "../../types/types";
import { useFetch } from "../../hooks/useFetch";
import { Card, CardMedia, Typography } from "@mui/material";

type HomepageMovieCardsProps = {
  query: string;
  name: string;
};

const HomepageMovieCards = ({ query, name }: HomepageMovieCardsProps) => {
  const data = useFetch(query);

  return (
    <div style={{ gridRow: "2", gridColumn: "1" }}>
      <Typography
        variant="h5"
        sx={{ color: "#cccccc", marginBottom: "0.5rem", paddingTop: "1rem" }}
      >
        {name}
      </Typography>
      <div
        className="main-page-cards-div similar"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 10.2rem)",
          gridTemplateRows: "repeat(auto-fill, 15.9rem)",
        }}
      >
        {data &&
          data.data.results.slice(0, 10).map((movie: Media) => (
            <a
              style={{ width: "10rem" }}
              key={movie.id}
              href={`/Cinema-log/#/movie/${movie.id}`}
            >
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-link-img"
                  component="img"
                  sx={{ width: "10rem", backgroundColor: "#161b22" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  height="250"
                />
              </Card>
            </a>
          ))}
      </div>
    </div>
  );
};

export default HomepageMovieCards;
