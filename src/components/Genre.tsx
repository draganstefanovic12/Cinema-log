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
    <Typography
      sx={{
        marginTop: "0.5em",
        display: "flex",
        gap: "1em",
        width: "7.3em",
        height: "2em",
        whiteSpace: "nowrap",
      }}
    >
      {data.genres.map((genre: GenreMapped) => (
        <ListItem
          key={genre.id}
          sx={{
            marginBottom: "0.2em",
            paddingBottom: "0.5em",
            backgroundColor: "#0f172a",
            justifyContent: "center",
          }}
          className="genre"
        >
          {genre.name}
        </ListItem>
      ))}
    </Typography>
  );
};
