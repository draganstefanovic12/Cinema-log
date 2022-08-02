import { ListItem } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

interface FollowProps {
  user: string | undefined;
  followedUser: string | undefined;
  followers: [];
}

export const Follow = ({ user, followedUser, followers }: FollowProps) => {
  const [follow, setFollow] = useState<string>();

  useEffect(() => {
    const checkFollow = followers.filter(
      (users: { name: string }) => users.name === user
    );
    checkFollow.length === 0 ? setFollow("Follow") : setFollow("Unfollow");
  }, [followers, user]);

  const handleClick = async () => {
    await axios.post(
      `http://localhost:5000/user/follow/${user}/${followedUser}`
    );
  };
  return (
    <Container
      sx={{
        display: "flex",
        width: "9em",
        color: "#CCCCCC",
        height: "2em",
        marginLeft: "2.5em",
        marginTop: "0.5em",
      }}
    >
      <ListItem
        sx={{ justifyContent: "center", backgroundColor: "#283038" }}
        onClick={() => {
          handleClick();
          setFollow(follow === "Follow" ? "Unfollow" : "Follow");
        }}
        button
      >
        {follow}
      </ListItem>
    </Container>
  );
};
