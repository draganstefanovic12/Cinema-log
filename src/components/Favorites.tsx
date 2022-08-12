import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import { AddFavoriteMedia } from "./AddFavoriteMedia";
import { Fragment, useEffect, useState } from "react";
import { CardMedia, Typography } from "@mui/material";
import favBg from "../assets/fav-movie-bg.png";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Media } from "../types/types";

export const Favorites = ({ favorites }: any) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>();
  const [favMedia, setFavMedia] = useState<any>();
  const params = useParams();
  const { user } = useAuth();

  useEffect(() => {
    updateMovies();
  }, [params.user]);

  const updateMovies = async () => {
    setFavMedia(favorites);
  };

  const handleRemove = async (mov: string, date: string) => {
    setFavMedia(favMedia.filter((media: Media) => media.createdAt !== date));
    await axios.delete(
      `https://media-log.herokuapp.com/user/removefavorite/${params.user}`,
      {
        headers: {
          Authorization: `${user?.username} ${user?.token}`,
        },
        data: {
          content: mov,
        },
      }
    );
  };

  return (
    <Container
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className="favorite-container"
    >
      <div className="fav-text-cont">
        <Typography className="favorite-movies" variant="h5">
          Favorites
        </Typography>
        {user?.username && user.username === params.user && hover && (
          <Typography
            variant="subtitle1"
            className="favorite-movies fav-edit"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Finish editing" : "Edit"}
          </Typography>
        )}
      </div>
      <div className="favorite-container-card">
        {edit ? (
          <>
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              media={favMedia[0] ? favMedia[0] : favMedia}
              setFavMovies={setFavMedia}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              media={favMedia[1] ? favMedia[1] : favMedia}
              setFavMovies={setFavMedia}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              media={favMedia[2] ? favMedia[2] : favMedia}
              setFavMovies={setFavMedia}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              media={favMedia[3] ? favMedia[3] : favMedia}
              setFavMovies={setFavMedia}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              media={favMedia[4] ? favMedia[4] : favMedia}
              setFavMovies={setFavMedia}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              media={favMedia[5] ? favMedia[5] : favMedia}
              setFavMovies={setFavMedia}
            />
          </>
        ) : (
          favMedia &&
          favMedia.map((media: Media) => (
            <Fragment key={media.createdAt!}>
              <FavoriteCard
                edit={edit}
                handleRemove={handleRemove}
                media={media}
              />
            </Fragment>
          ))
        )}
      </div>
    </Container>
  );
};

export const FavoriteCard = ({
  media,
  handleRemove,
  edit,
  setFavMovies,
}: any) => {
  const [input, setInput] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      {edit ? (
        <div
          className="fav-edit-cont"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <>
            {hover && media.poster_path && (
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleRemove(media.title, media.createdAt);
                }}
                className="fav-remove-icon"
              />
            )}
            <CardMedia
              src={
                media.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${media.poster_path}`
                  : favBg
              }
              className="fav-edit-card"
              component="img"
              height="250"
            />
            {!media.poster_path && hover && (
              <ControlPointOutlinedIcon
                onClick={() => setInput(true)}
                className="fav-add-icon"
              />
            )}
          </>
          {input && (
            <AddFavoriteMedia setInput={setInput} setFavMovies={setFavMovies} />
          )}
        </div>
      ) : (
        <Link to={`/${media.type}/${media.id}`}>
          <CardMedia
            component="img"
            height="270"
            style={{
              width: "11em",
              paddingBottom: "1em",
            }}
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
          />
        </Link>
      )}
    </>
  );
};
