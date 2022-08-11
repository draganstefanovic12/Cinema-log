import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFetch } from "../hooks/useFetch";
import { ListToParse, Media } from "../types/types";

export const SearchLists = () => {
  const data = useFetch(`http://localhost:5000/lists/all`);

  return (
    <Container>
      {data &&
        data.data.map((list: ListToParse) => (
          <a href={`/#/list/${list.name}`}>
            <Card
              sx={{
                backgroundColor: "#161b22",
                paddingLeft: "1rem",
                height: "20rem",
                width: "auto",
                marginBottom: "2rem",
                paddingTop: "1rem",
              }}
            >
              <Typography className="svg" sx={{ marginBottom: "1rem" }}>
                {list.name}
              </Typography>
              <div style={{ display: "flex" }}>
                {JSON.parse(list.content)
                  .slice(0, 7)
                  .map((img: Media) => (
                    <CardMedia
                      component="img"
                      sx={{ width: "10rem" }}
                      src={`https://image.tmdb.org/t/p/w500/${img.poster_path}`}
                      height={250}
                    />
                  ))}
              </div>
            </Card>
          </a>
        ))}
    </Container>
  );
};
