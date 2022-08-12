import { useAuth } from "../context/AuthContext";
import { ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { FollowProps } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";

export const Follow = ({ usr, followedUser, followers, typ }: FollowProps) => {
  const [follow, setFollow] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    //need to replace checkFollow user with Followeduser
    const checker = typ ? usr : followedUser;
    const checkFollow = followers.filter(
      (users: { name: string }) => users.name === checker
    );
    checkFollow.length === 0 ? setFollow("Follow") : setFollow("Unfollow");
  }, [followers, user]);

  const handleClick = async () => {
    await axios(
      `https://media-log.herokuapp.com/user/follow/${usr}/${followedUser}`,
      {
        method: "POST",
        headers: {
          Authorization: `${user?.username} ${user?.token}`,
        },
      }
    );
  };
  //dragan i qqq

  return (
    <Container
      sx={{
        display: "flex",
        width: "9em",
        color: "#CCCCCC",
        position: "relative",
        height: "2em",
        margin: "0",
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
