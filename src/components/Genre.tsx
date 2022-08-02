import { ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface GenreMapped {
  name: string;
  id: number;
}

interface GenreProps {
  data: {
    genres: GenreMapped[];
  };
}

export const Genre = ({ data }: GenreProps) => {
  return (
    <Typography className="genres">
      {data.genres.map((genre: GenreMapped) => (
        <ListItem className="genre" key={genre.id}>
          {genre.name}
        </ListItem>
      ))}
    </Typography>
  );
};
