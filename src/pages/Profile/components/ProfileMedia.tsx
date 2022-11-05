import { Link } from "react-router-dom";
import { Media } from "@/types/types";
import { useState } from "react";
import { Container } from "@mui/system";
import { Card, CardMedia, ListItem, Pagination } from "@mui/material";

type MediaProps = {
  media: {
    watchlist: [];
    watched: Media[];
  };
  type: string | undefined;
  user: string | undefined;
};

//Shows either movies or TV shows on profile depending on the prop
const MoviesOrShows = ({ media, type }: MediaProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [watchType, setWatchType] = useState<Media[]>(media.watched);

  return (
    <Container className="profile-media-cont">
      <div className="profile-media-watched-watchlist">
        <ListItem
          className="profile-media-watched-watchlist-card"
          style={{ color: watchType === media.watched ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType(media.watched)}
          button
        >
          Watched
        </ListItem>
        <ListItem
          className="profile-media-watched-watchlist-card"
          style={{ color: watchType === media.watchlist ? "#fff" : "#cccccc" }}
          onClick={() => setWatchType(media.watchlist)}
          button
        >
          Watchlist
        </ListItem>
      </div>
      {watchType && (
        <Container className="profile-media-grid-cont">
          {watchType.slice(offset, offset + 18).map((media: Media) => (
            <Link className="movie-card-link" key={media.id} to={`/${type}/${media.id}`}>
              <Card variant="outlined">
                <CardMedia
                  className="movie-card-img"
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${media.poster!}`}
                  height="200"
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
        count={Math.ceil(media.watched.length / 18)}
        shape="rounded"
      />
    </Container>
  );
};

export default MoviesOrShows;
