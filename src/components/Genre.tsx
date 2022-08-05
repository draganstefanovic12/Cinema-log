import { ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface GenreMapped {
  name: string;
  id: number;
}

interface GenreProps {
  data: {
    genres: GenreMapped[];
  };
  type: string | undefined;
}

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
