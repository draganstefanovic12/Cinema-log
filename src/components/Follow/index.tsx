import { useAuth } from "@/features/auth/context/AuthContext";
import { ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import backendApi from "@/features/api/backendApi";

type FollowProps = {
  usr: string | undefined;
  followedUser: string | undefined;
  followers: [];
  typ?: string;
  getClass?: string;
  //typ serves for profile followers/following, it only works if i reverse the comparison
};

const Follow = ({ usr, followedUser, followers, typ, getClass }: FollowProps) => {
  const [follow, setFollow] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    //need to replace checkFollow user with Followeduser
    const checker = typ ? usr : followedUser;
    const checkFollow = followers.filter((users: { name: string }) => users.name === checker);
    checkFollow.length === 0 ? setFollow("Follow") : setFollow("Unfollow");
  }, [followers, user]);

  const handleClick = async () => {
    await backendApi.post(`/user/follow/${usr}/${followedUser}`);
  };

  return (
    <Container
      className={getClass}
      sx={{
        display: "flex",
        width: "8em",
        height: "1.5rem",
        justifyContent: "center",
        color: "#CCCCCC",
        margin: "0",
      }}
    >
      <ListItem
        sx={{ justifyContent: "center", backgroundColor: "#181e26" }}
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

export default Follow;
