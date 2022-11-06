import { useAuth } from "@/features/auth/context/AuthContext";
import { Typography } from "@mui/material";
import UserFeed from "@/components/UserFeed";

const HomepageUserFeed = () => {
  const { user } = useAuth();

  return (
    <>
      {user && user.followedUsersFeed.length === 0 && (
        <Typography>
          You're not following anyone yet. Browse{" "}
          <a href="/Cinema-log/#/search/allusers/multi">users</a> and find someone who shares the
          same interests as you.
        </Typography>
      )}
      {user && user.followedUsersFeed.length > 0 && (
        <UserFeed feed={user.followedUsersFeed} name={"Friend Activity"} />
      )}
    </>
  );
};

export default HomepageUserFeed;
