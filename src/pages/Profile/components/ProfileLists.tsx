import { List } from "@/pages/List/types";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { Container } from "@mui/system";
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
    <div className="profile-list-cont">
      <Container className="profiles-lists">
        {usr === user?.username && (
          <Button onClick={() => setAdd(!add)} className="btn-new-list">
            New List
          </Button>
        )}
        {list &&
          list.map((list: List) => (
            <Link key={list.name} className="profiles-lists-links" to={`/list/${list.name}`}>
              <Typography variant="h6">{list.name}</Typography>
              <ul className="profiles-lists-wrapper-ul">
                {JSON.parse(list!.content[0])
                  .slice(0, 4)
                  .map((movImg: { poster: string }) => (
                    <CardMedia
                      key={movImg.poster}
                      className="list-img"
                      component="img"
                      height="200"
                      src={`https://image.tmdb.org/t/p/w500/${movImg.poster}`}
                    />
                  ))}
              </ul>
            </Link>
          ))}
        {add && <NewList setAdd={setAdd} />}
      </Container>
    </div>
  );
};

export default ProfileLists;
