import { Container } from "@mui/system";

interface MoviesProps {
  movies: {
    watchlist: [];
    watched: [];
  };
}

export const Movies = ({ movies }: MoviesProps) => {
  return (
    <Container sx={{ backgroundColor: "#141c30", height: "60vh" }}>
      <Container
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "flex-end",
          paddingTop: "2em",
        }}
      ></Container>
    </Container>
  );
};
