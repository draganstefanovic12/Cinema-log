import "./styles/genres.css";
import { useNavigate } from "react-router-dom";
import { GenreMapped } from "../../types/types";
import { ListItem, Typography } from "@mui/material";

type GenreProps = {
  data: {
    genres: GenreMapped[];
  };
  type: string | undefined;
};

export const Genre = ({ data, type }: GenreProps) => {
  const navigate = useNavigate();
  return (
    <Typography className="genres">
      {data.genres.map((genre: GenreMapped) => (
        <ListItem
          onClick={() => navigate(`/search/${genre.id}/${type}/`)}
          className="genre"
          key={genre.id}
        >
          {genre.name}
        </ListItem>
      ))}
    </Typography>
  );
};
