import { List } from "@/pages/List/types";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Container } from "@mui/system";
import { Fragment, useState } from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import NewList from "@/components/NewList";

interface ListProps {
  usr: string | undefined;
  list: List[] | undefined;
}

const ProfileLists = ({ list, usr }: ListProps) => {
  const [add, setAdd] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <Container className="profile-list-cont">
      {usr === user?.username && (
        <Button onClick={() => setAdd(!add)} className="btn-new-list">
          New List
        </Button>
      )}
      <Container sx={{ height: "52em", color: "#cccccc" }} className="profiles-lists">
        {list &&
          list.map((list: List) => (
            <Fragment key={list.name}>
              <Link style={{ width: "25em" }} to={`/list/${list.name}`}>
                <Typography variant="h5" sx={{ display: "flex", color: "#cccccc" }}>
                  {list.name}
                </Typography>
                <div style={{ display: "flex", width: "20em" }}>
                  {JSON.parse(list!.content[0])
                    .slice()
                    .map((movImg: { poster: string }) => (
                      <CardMedia
                        key={movImg.poster}
                        className="list-img"
                        component="img"
                        height="200"
                        src={`https://image.tmdb.org/t/p/w500/${movImg.poster}`}
                      />
                    ))}
                </div>
              </Link>
            </Fragment>
          ))}
        {add && <NewList setAdd={setAdd} />}
      </Container>
    </Container>
  );
};

export default ProfileLists;
