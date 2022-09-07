import { List } from "../../types/types";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NewList } from "../NewList/NewList";
import { Container } from "@mui/system";
import { Fragment, useState } from "react";
import { Button, CardMedia, Typography } from "@mui/material";

interface ListProps {
  usr: string | undefined;
  setLists: React.Dispatch<React.SetStateAction<List[] | undefined>>;
  list: List[] | undefined;
}

export const Lists = ({ list, usr, setLists }: ListProps) => {
  const [add, setAdd] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <Container className="profile-list-cont">
      {usr === user?.username && (
        <Button onClick={() => setAdd(!add)} className="btn-new-list">
          New List
        </Button>
      )}
      <Container
        sx={{ height: "52em", color: "#cccccc" }}
        className="profiles-lists"
      >
        {list &&
          list.map((list: List) => (
            <Fragment key={list.name}>
              <Link style={{ width: "25em" }} to={`/list/${list.name}`}>
                <Typography
                  variant="h5"
                  sx={{ display: "flex", color: "#cccccc" }}
                >
                  {list.name}
                </Typography>
                <div style={{ display: "flex", width: "20em" }}>
                  {list.content
                    .slice(0, 4)
                    .map((movImg: { poster_path: string }) => (
                      <CardMedia
                        key={movImg.poster_path}
                        className="list-img"
                        component="img"
                        height="200"
                        src={`https://image.tmdb.org/t/p/w500/${movImg.poster_path}`}
                      />
                    ))}
                </div>
              </Link>
            </Fragment>
          ))}
        {add && <NewList setLists={setLists} setAdd={setAdd} usr={usr} />}
      </Container>
    </Container>
  );
};
