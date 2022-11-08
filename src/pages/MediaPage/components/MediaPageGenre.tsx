import { GenreMapped } from "../types";
import { useNavigate } from "react-router-dom";
import { ListItem, Typography } from "@mui/material";

type GenreProps = {
  data: {
    genres: GenreMapped[];
  };
  type: string | undefined;
};

const MediaPageGenre = ({ data, type }: GenreProps) => {
  const navigate = useNavigate();

  const genres = data.genres.map((genre: GenreMapped) => (
    <ListItem
      onClick={() => navigate(`/search/${genre.id}/${type}/1`)}
      className="genre"
      key={genre.id}
    >
      {genre.name}
    </ListItem>
  ));

  return <Typography className="genres">{genres}</Typography>;
};

export default MediaPageGenre;
