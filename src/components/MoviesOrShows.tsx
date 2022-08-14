import { Card, CardMedia, ListItem, Pagination } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Media, MediaProps } from "../types/types";

export const MoviesOrShows = ({ movies, type, user }: MediaProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [watchType, setWatchType] = useState<any>(movies.watched);

  return (
    <Container className="profile-list-cont">
      <div className="watched-watchlist-cont">
        <ListItem
          style={{ color: watchType === "watched" ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType(movies.watched)}
          sx={{ width: "6em" }}
          button
        >
          Watched
        </ListItem>
        <ListItem
          style={{ color: watchType === "watchlist" ? "#fff" : "#cccccc" }}
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
        onChange={(e: any) => {
          setOffset((parseInt(e.target.textContent) - 1) * 18);
        }}
        count={Math.ceil(movies.watched.length / 18)}
        shape="rounded"
      />
    </Container>
  );
};
