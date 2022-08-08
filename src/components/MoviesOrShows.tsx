import { Card, CardMedia, ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { SearchPagination } from "./SearchPagination";
import { Media, MediaProps } from "../types/types";

export const MoviesOrShows = ({ movies, type, user }: MediaProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [watchType, setWatchType] = useState<string>("watched");
  const data = useFetch(
    `http://localhost:5000/user/${type}/${watchType}/${user}/${offset}/${type}`
  );

  return (
    <Container className="profile-list-cont">
      <div className="watched-watchlist-cont">
        <ListItem
          style={{ color: watchType === "watched" ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType("watched")}
          sx={{ width: "6em" }}
          button
        >
          Watched
        </ListItem>
        <ListItem
          style={{ color: watchType === "watchlist" ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType("watchlist")}
          sx={{ width: "6em" }}
          button
        >
          Watchlist
        </ListItem>
      </div>
      {data && (
        <Container className="movie-grid-cont">
          {data.data.map((movie: Media) => (
            <Link key={movie.id} to={`/${type}/${movie.id}`}>
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster!}`}
                  height="250"
                />
              </Card>
            </Link>
          ))}
        </Container>
      )}
      <SearchPagination
        setOffset={setOffset}
        count={Math.ceil(movies.watched.length / 18)}
      />
    </Container>
  );
};
