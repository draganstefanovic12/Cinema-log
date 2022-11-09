import { List } from "./types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import { getList, likeList } from "@/features/api/backendApi";
import { CardMedia, ListItem, Typography } from "@mui/material";
import ListRemove from "./components/ListRemove";
import Spinner from "@/components/Spinner";
import MediaCard from "@/components/MediaCard/MediaCard";

export const PageList = () => {
  const { name } = useParams();
  const { user } = useAuth();
  const { isLoading, data } = useQuery(["listPage"], () => {
    return getList(name);
  });

  if (isLoading) {
    return <Spinner />;
  }

  const parsed = JSON.parse(data.content[0]);

  const handleClick = async () => {
    await likeList(data.username);
  };

  return (
    <Container className="list-main-cont">
      <Container className="list-wrapper">
        <div>
          <Typography variant="h5">{data.name}</Typography>
          <Typography>{data.description}</Typography>
          <div className="list-wrapper-createdby">
            <Typography>Created by:</Typography>
            <Link className="list-wrapper-user-link" to={`/user/${data.username}`}>
              {data.username}
            </Link>
          </div>
        </div>
        <div>
          {user?.username === data.username && <ListRemove list={data} />}
          {user?.username !== data.username && (
            <ListItem onClick={handleClick} button>
              Like the list? Tell {data.username} about it.
            </ListItem>
          )}
        </div>
      </Container>
      <Container className="list-grid-cont">
        {parsed.map((list: List, i: number) => (
          <Link key={i} className="movie-card-link" to={`/${list.type!}/${list.id!}`}>
            <MediaCard src={`/w500/${list.poster_path}`} />
          </Link>
        ))}
      </Container>
    </Container>
  );
};
