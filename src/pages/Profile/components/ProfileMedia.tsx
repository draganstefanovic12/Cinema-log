import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
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

  const listItems = [
    { class: "profile-media-watched-watchlist-card", child: "Watched", media: media.watched },
    { class: "profile-media-watched-watchlist-card", child: "Watchlist", media: media.watchlist },
  ];

  return (
    <Container className="profile-media-cont">
      <div className="profile-media-watched-watchlist">
        {listItems.map((list, i) => (
          <ListItem
            key={i}
            className={list.class}
            style={{
              color: watchType === list.media ? "#fff" : "#cccccc",
              backgroundColor: watchType === list.media ? "#161b22" : "#181e26",
            }}
            onClick={() => setWatchType(list.media)}
            button
          >
            {list.child}
          </ListItem>
        ))}
      </div>
      {watchType && (
        <Container className="profile-media-grid-cont">
          {watchType.slice(offset, offset + 24).map((media: Media) => (
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
        className="search-pagination"
        hidePrevButton
        hideNextButton
        onChange={(e: React.ChangeEvent<unknown>) => {
          const input = e.target as HTMLElement;
          setOffset((parseInt(input.innerText) - 1) * 24);
        }}
        count={Math.ceil(media.watched.length / 24)}
        shape="rounded"
      />
    </Container>
  );
};

export default MoviesOrShows;
