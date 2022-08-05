import { Button, CardMedia, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewList } from "./NewList";

interface ListsProps {
  user: string | undefined;
}

interface List {
  name: string;
  content: [];
  createdAt: string;
  updatedAt?: string;
  description: string;
}

export const Lists = ({ user }: ListsProps) => {
  const [lists, setLists] = useState<[List]>();
  const [add, setAdd] = useState<boolean>(false);

  const handleLists = async () => {
    const data = await axios.get(`http://localhost:5000/user/lists/${user}`);
    setLists(data.data);
  };

  useEffect(() => {
    handleLists();
  }, []);

  return (
    <Container className="profile-list-cont">
      <Button onClick={() => setAdd(!add)} className="btn-new-list">
        New List
      </Button>
      <Container
        sx={{ height: "52em", color: "#cccccc" }}
        className="profiles-lists"
      >
        {lists &&
          lists.map((list: List) => (
            <>
              <Link style={{ width: "25em" }} to={`/list/${list.name}`}>
                <Typography variant="h5" sx={{ display: "flex" }}>
                  {list.name}
                </Typography>
                <div style={{ display: "flex", width: "20em" }}>
                  {list.content
                    .slice(0, 4)
                    .map((movImg: { poster_path: string }) => (
                      <CardMedia
                        className="list-img"
                        component="img"
                        height="200"
                        src={`https://image.tmdb.org/t/p/w500/${movImg.poster_path}`}
                      />
                    ))}
                </div>
              </Link>
            </>
          ))}

        {lists === undefined && (
          <Typography className="no-lists" variant="h4">
            No lists...
          </Typography>
        )}
        {add && <NewList setLists={setLists} setAdd={setAdd} user={user} />}
      </Container>
    </Container>
  );
};
