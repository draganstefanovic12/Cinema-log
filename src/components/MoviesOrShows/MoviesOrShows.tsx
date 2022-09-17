import { Link } from "react-router-dom";
import { Media } from "../../types/types";
import { useState } from "react";
import { Container } from "@mui/system";
import { Card, CardMedia, ListItem, Pagination } from "@mui/material";

type MediaProps = {
  movies: {
    watchlist: [];
    watched: Media[];
  };
  type: string | undefined;
  user: string | undefined;
};

//Shows either movies or TV shows on profile depending on the prop
const MoviesOrShows = ({ movies, type }: MediaProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [watchType, setWatchType] = useState<Media[]>(movies.watched);

  return (
    <Container className="profile-list-cont">
      <div className="watched-watchlist-cont">
        <ListItem
          className="watched"
          style={{ color: watchType === movies.watched ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType(movies.watched)}
          sx={{ width: "6em" }}
          button
        >
          Watched
        </ListItem>
        <ListItem
          className="watchlist"
          style={{ color: watchType === movies.watchlist ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType(movies.watchlist)}
          sx={{ width: "6em" }}
          button
        >
          Watchlist
        </ListItem>
      </div>
      {watchType && (
        <Container className="movie-grid-cont">
          {watchType.slice(offset, offset + 18).map((movie: Media) => (
            <Link key={movie.id} to={`/${type}/${movie.id}`}>
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-img"
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster!}`}
                  height="250"
                />
              </Card>
            </Link>
          ))}
        </Container>
      )}
      <Pagination
        className="pagination"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
        }}
        hidePrevButton
        hideNextButton
        onChange={(e: React.ChangeEvent<unknown>) => {
          const input = e.target as HTMLElement;
          setOffset((parseInt(input.innerText) - 1) * 18);
        }}
        count={Math.ceil(movies.watched.length / 18)}
        shape="rounded"
      />
    </Container>
  );
};

export default MoviesOrShows;
