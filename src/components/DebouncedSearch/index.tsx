import { debouncedSearch } from "@/features/api/backendApi";
import {
  CardMedia,
  ClickAwayListener,
  Input,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { Media } from "@/pages/MediaPage/types";
import { useState } from "react";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { useDebounce } from "@/hooks/useDebounce";

type DebouncedSearchProps = {
  setInput?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: any;
};

const DebouncedSearch = ({ setInput, handleClick }: DebouncedSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>();
  const [hidden, setHidden] = useState<boolean>(false);
  const { debounce } = useDebounce(searchValue);

  const { data } = useQuery(
    ["search", debounce],
    () => {
      return debouncedSearch(debounce);
    },
    { enabled: !!searchValue }
  );

  return (
    <ClickAwayListener onClickAway={() => (setInput ? setInput(false) : setHidden(true))}>
      <Container className="search-fav">
        <Input
          onClick={() => setHidden(false)}
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {debounce &&
          data &&
          data.results
            .filter(({ media_type }: Media) => media_type === "tv" || media_type === "movie")
            .slice(0, 10)
            .map(
              ({
                title,
                id,
                poster_path,
                original_name,
                media_type,
                first_air_date,
                release_date,
              }: Media) => (
                <Paper
                  key={id}
                  className="search-fav-paper"
                  sx={{
                    display: hidden ? "none" : "block",
                  }}
                >
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        handleClick({
                          title: title ? title : original_name,
                          id: id,
                          poster: poster_path,
                          type: media_type,
                        });
                      }}
                    >
                      <CardMedia
                        sx={{ width: "2em" }}
                        component="img"
                        height={50}
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      />
                      <ListItemText style={{ marginLeft: "1em" }}>
                        {title ? title : original_name}
                        {first_air_date && `(${first_air_date.slice(0, 4)})`}
                        {release_date && `(${release_date.slice(0, 4)})`}
                      </ListItemText>
                    </MenuItem>
                  </MenuList>
                </Paper>
              )
            )}
      </Container>
    </ClickAwayListener>
  );
};

export default DebouncedSearch;
