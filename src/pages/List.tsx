import { CardMedia, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { RemoveList } from "../components/RemoveList";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { List } from "../types/types";

export const PageList = () => {
  const { name } = useParams();
  const { user } = useAuth();

  const data = useFetch(`http://localhost:5000/lists/list/${name}`);
  const parsed = data && JSON.parse(data.data.content[0]);

  const handleClick = async () => {
    await axios.post(
      `http://localhost:5000/user/likelist/${data.data.username}`,
      {
        userThatLiked: user?.username,
        list: data.data.name,
      }
    );
  };

  return (
    <>
      {data && (
        <Container className="list-main-cont">
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ width: "70%", overflowWrap: "break-word" }}>
              <Typography variant="h5">{data.data.name}</Typography>
              <Typography sx={{ color: "#A7A7A7" }}>
                {data.data.description}
              </Typography>
              <div style={{ display: "flex" }}>
                <Typography>Created by:</Typography>
                <Link
                  style={{ marginTop: "0.3em", marginLeft: "0.5em" }}
                  to={`/user/${data.data.username}`}
                >
                  {data.data.username}
                </Link>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {user?.username === data.data.username && (
                <RemoveList list={data.data} user={user?.username} />
              )}
              {user?.username !== data.data.username && (
                <ListItem
                  onClick={handleClick}
                  button
                  sx={{ whiteSpace: "nowrap", width: "17em", marginTop: "1em" }}
                >
                  Like the list? Tell {data.data.username} about it.
                </ListItem>
              )}
            </div>
          </Container>
          <Container className="list-grid-cont">
            {data &&
              parsed.map((list: List) => (
                <Link to={`/${list.type!}/${list.id!}`}>
                  <CardMedia
                    sx={{ width: "8em" }}
                    component="img"
                    height="200"
                    src={`https://image.tmdb.org/t/p/w500/${list.poster_path!}`}
                  />
                </Link>
              ))}
          </Container>
        </Container>
      )}
    </>
  );
};
