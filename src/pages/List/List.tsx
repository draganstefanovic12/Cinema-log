import "./styles/list.css";
import { List } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { Container } from "@mui/system";
import RemoveList from "../../components/RemoveList";
import { Link, useParams } from "react-router-dom";
import { CardMedia, ListItem, Typography } from "@mui/material";
import axios from "../../features/axios/incerceptor";

export const PageList = () => {
  const { name } = useParams();
  const { user } = useAuth();

  const data = useFetch(`https://media-log.herokuapp.com/lists/list/${name}`);
  const parsed = data && JSON.parse(data.data.content[0]);

  const handleClick = async () => {
    await axios.post(
      `https://media-log.herokuapp.com/user/likelist/${data.data.username}`
    );
  };

  return (
    <>
      {data && (
        <Container className="list-main-cont">
          <Container className="list-wrapper">
            <div>
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
                <RemoveList list={data.data} usr={user?.username} />
              )}
              {user?.username !== data.data.username && (
                <ListItem onClick={handleClick} button>
                  Like the list? Tell {data.data.username} about it.
                </ListItem>
              )}
            </div>
          </Container>
          <Container className="list-grid-cont">
            {data &&
              parsed.map((list: List) => (
                <Link
                  className="movie-card-link"
                  to={`/${list.type!}/${list.id!}`}
                >
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
