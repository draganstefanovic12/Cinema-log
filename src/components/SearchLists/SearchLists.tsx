import { useFetch } from "../../hooks/useFetch";
import { Container } from "@mui/system";
import { ListToParse, Media } from "../../types/types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export const SearchLists = () => {
  const data = useFetch(`https://media-log.herokuapp.com/lists/all`);

  return (
    <Container>
      {data &&
        data.data.map((list: ListToParse) => (
          <a href={`/Cinema-log/#/list/${list.name}`}>
            <Card
              sx={{
                height: "20rem",
                width: "auto",
                marginBottom: "1rem",
              }}
            >
              <CardContent sx={{ backgroundColor: "#14181c" }}>
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
              </CardContent>
            </Card>
          </a>
        ))}
    </Container>
  );
};
