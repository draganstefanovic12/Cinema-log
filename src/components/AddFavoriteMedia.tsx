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

interface FilterContent {
  media_type: string;
}

interface Media {
  original_name: string;
  title: string;
  poster_path: string;
  release_date: string;
  id: string;
}

interface AddFavoriteMediaProps {
  setInput: React.Dispatch<React.SetStateAction<boolean>>;
  setFavMovies: any;
}

export const AddFavoriteMedia = ({
  setInput,
  setFavMovies,
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

  const handleClick = async (name: string, id: string, poster: string) => {
    await axios.post(
      `http://localhost:5000/user/addfavorite/${user?.username}/`,
      {
        title: name,
        id: id,
        poster: poster,
      }
    );
  };

  useEffect(() => {
    debounce && handleSearch();
  }, [debounce]);

  return (
    <ClickAwayListener onClickAway={() => setInput(false)}>
      <Container className="search-fav">
        <Input
          onClick={() => setHidden(false)}
          placeholder="Search movies..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {debounce &&
          result &&
          result.data.results
            .filter((type: FilterContent) => type.media_type === "movie")
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
                      handleClick(movie.title, movie.id, movie.poster_path);
                      setHidden(true);
                      setInput(false);
                      setFavMovies((currMovies: any) => [
                        ...currMovies,
                        {
                          title: movie.title,
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
                      {movie.title} ({movie.release_date.slice(0, 4)})
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            ))}
      </Container>
    </ClickAwayListener>
  );
};
