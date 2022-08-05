import axios from "axios";
import {
  CardMedia,
  ClickAwayListener,
  Input,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useAuth } from "../context/AuthContext";

interface Media {
  original_name: string;
  title: string;
  poster_path: string;
  release_date: string;
  id: string;
  first_air_date: string;
  media_type: string;
}

interface AddFavoriteMediaProps {
  setInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setFavMovies?: React.Dispatch<React.SetStateAction<object[]>>;
  setContent?: React.Dispatch<React.SetStateAction<object[]>>;
}

export const AddFavoriteMedia = ({
  setInput,
  setFavMovies,
  setContent,
}: AddFavoriteMediaProps) => {
  const [searchValue, setSearchValue] = useState<any>();
  const [hidden, setHidden] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const { user } = useAuth();

  //setting search value when typing and 0.5sec later searching for results
  const { debounce } = useDebounce(searchValue);

  const handleSearch = async () => {
    const data = await axios.get(`http://localhost:5000/imdb/${debounce}/`);
    setResult(data);
  };

  const handleClick = async (
    name: string,
    id: string,
    poster: string,
    type: string
  ) => {
    await axios.post(
      `http://localhost:5000/user/addfavorite/${user?.username}/`,
      {
        title: name,
        id: id,
        poster: poster,
        type: type,
      }
    );
  };

  useEffect(() => {
    debounce && handleSearch();
  }, [debounce]);

  return (
    <ClickAwayListener
      onClickAway={() => (setInput ? setInput(false) : setHidden(true))}
    >
      <Container className="search-fav">
        <Input
          onClick={() => setHidden(false)}
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {debounce &&
          result &&
          result.data.results
            .filter(
              (media: Media) =>
                media.media_type === "tv" || media.media_type === "movie"
            )
            .slice(0, 10)
            .map((movie: Media) => (
              <Paper
                sx={{
                  width: "30em",
                  backgroundColor: "#161b22",
                  display: hidden ? "none" : "block",
                }}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setContent
                        ? setContent((currCont: object[]) => [
                            ...currCont,
                            {
                              title: movie.title
                                ? movie.title
                                : movie.original_name,
                              id: movie.id,
                              poster_path: movie.poster_path,
                              type: movie.media_type,
                              createdAt: new Date(),
                            },
                          ])
                        : handleClick(
                            movie.title ? movie.title : movie.original_name,
                            movie.id,
                            movie.poster_path,
                            movie.media_type
                          );
                      setHidden(true);
                      setInput && setInput!(false);
                      setFavMovies &&
                        setFavMovies((currMovies: object[]) => [
                          ...currMovies,
                          {
                            title: movie.title
                              ? movie.title
                              : movie.original_name,
                            id: movie.id,
                            poster_path: movie.poster_path,
                          },
                        ]);
                    }}
                  >
                    <CardMedia
                      sx={{ width: "2em" }}
                      component="img"
                      height={50}
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <ListItemText style={{ marginLeft: "1em" }}>
                      {movie.title ? movie.title : movie.original_name} (
                      {movie.first_air_date
                        ? movie.first_air_date.slice(0, 4)
                        : movie.release_date.slice(0, 4)}
                      )
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            ))}
      </Container>
    </ClickAwayListener>
  );
};
