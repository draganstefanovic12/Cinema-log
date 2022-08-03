import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container } from "@mui/system";
import { AddFavoriteMedia } from "./AddFavoriteMedia";
import { useEffect, useState } from "react";
import { CardMedia, Typography } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import favBg from "../assets/fav-movie-bg.png";

interface Movies {
  poster_path: string;
  title: string;
  id: string;
}

export const FavoriteMovies = ({ movies }: any) => {
  const [favMovies, setFavMovies] = useState(movies);
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>();
  const { user } = useParams();

  useEffect(() => {
    setFavMovies(movies);
  }, [movies]);

  const handleRemove = async (mov: string) => {
    setFavMovies(favMovies.filter((movie: Movies) => movie.title !== mov));
    await axios.delete(`http://localhost:5000/user/removefavorite/${user}`, {
      data: {
        content: mov,
      },
    });
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography className="favorite-movies" variant="h5">
          Favorite Movies
        </Typography>
        {hover && (
          <Typography
            variant="subtitle1"
            className="favorite-movies"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Finish editing" : "Edit"}
          </Typography>
        )}
      </div>
      <div className="favorite-container-card">
        {edit ? (
          <>
            <HoverRemove
              edit={edit}
              handleRemove={handleRemove}
              movie={movies[0] ? movies[0] : movies}
              setFavMovies={setFavMovies}
            />
            <HoverRemove
              edit={edit}
              handleRemove={handleRemove}
              movie={movies[1] ? movies[1] : movies}
              setFavMovies={setFavMovies}
            />
            <HoverRemove
              edit={edit}
              handleRemove={handleRemove}
              movie={movies[2] ? movies[2] : movies}
              setFavMovies={setFavMovies}
            />
            <HoverRemove
              edit={edit}
              handleRemove={handleRemove}
              movie={movies[3] ? movies[3] : movies}
              setFavMovies={setFavMovies}
            />
          </>
        ) : (
          favMovies.map((movie: Movies) => (
            <HoverRemove
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

export const HoverRemove = ({
  movie,
  handleRemove,
  edit,
  setFavMovies,
}: any) => {
  const [input, setInput] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [remove, setRemove] = useState<any>();
  return (
    <>
      {edit ? (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <>
            {hover && movie.poster_path && (
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleRemove(movie.title);
                  setRemove(true);
                }}
                style={{
                  position: "absolute",
                  transform: "translateX(6.3em)",
                  color: "#fff",
                  zIndex: "1",
                }}
              />
            )}
            <CardMedia
              src={
                remove
                  ? remove
                  : movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : favBg
              }
              component="img"
              height="270"
              style={{
                width: "11.2em",
                paddingBottom: "1em",
              }}
            />
            {!movie.poster_path && hover && (
              <ControlPointOutlinedIcon
                onClick={() => setInput(true)}
                style={{
                  position: "absolute",
                  transform: "translate(2.7em, -7.3em)",
                  color: "#fff",
                  width: "2em",
                  height: "3em",
                }}
              />
            )}
          </>
          {input && (
            <AddFavoriteMedia
              setRemove={setRemove}
              setInput={setInput}
              setFavMovies={setFavMovies}
            />
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
