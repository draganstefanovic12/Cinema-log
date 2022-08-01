import { ListItem, Typography } from "@mui/material";

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
