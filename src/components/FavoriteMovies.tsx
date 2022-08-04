import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import { AddFavoriteMedia } from "./AddFavoriteMedia";
import { useEffect, useState } from "react";
import { CardMedia, Typography } from "@mui/material";
import favBg from "../assets/fav-movie-bg.png";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

interface Movies {
  poster_path: string;
  title: string;
  id: string;
  createdAt: string;
}

export const FavoriteMovies = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>();
  const [favMovies, setFavMovies] = useState<any>();
  const params = useParams();
  const { user } = useAuth();

  useEffect(() => {
    updateMovies();
  }, [edit, params.user]);

  const updateMovies = async () => {
    const data = await axios.get(`http://localhost:5000/user/${params.user}`);
    setFavMovies(data.data.user.favoriteMovies);
  };

  const handleRemove = async (mov: string, date: string) => {
    setFavMovies(favMovies.filter((movie: Movies) => movie.createdAt !== date));
    await axios.delete(
      `http://localhost:5000/user/removefavorite/${params.user}`,
      {
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
          Favorite Movies
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
              movie={favMovies[0] ? favMovies[0] : favMovies}
              setFavMovies={setFavMovies}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              movie={favMovies[1] ? favMovies[1] : favMovies}
              setFavMovies={setFavMovies}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              movie={favMovies[2] ? favMovies[2] : favMovies}
              setFavMovies={setFavMovies}
            />
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              movie={favMovies[3] ? favMovies[3] : favMovies}
              setFavMovies={setFavMovies}
            />
          </>
        ) : (
          favMovies &&
          favMovies.map((movie: Movies) => (
            <FavoriteCard
              edit={edit}
              handleRemove={handleRemove}
              movie={movie}
            />
          ))
        )}
      </div>
    </Container>
  );
};

export const FavoriteCard = ({
  movie,
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
            {hover && movie.poster_path && (
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleRemove(movie.title, movie.createdAt);
                }}
                className="fav-remove-icon"
              />
            )}
            <CardMedia
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : favBg
              }
              className="fav-edit-card"
              component="img"
              height="250"
            />
            {!movie.poster_path && hover && (
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
        <Link to={`/movie/${movie.id}`}>
          <CardMedia
            component="img"
            height="270"
            style={{
              width: "11em",
              paddingBottom: "1em",
            }}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        </Link>
      )}
    </>
  );
};
