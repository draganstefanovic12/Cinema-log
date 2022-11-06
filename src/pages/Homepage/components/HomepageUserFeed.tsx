import { useAuth } from "@/features/auth/context/AuthContext";
import { Typography } from "@mui/material";
import { Feed, User } from "@/pages/Profile/types";
import { useEffect, useState } from "react";
import UserFeed from "@/components/UserFeed";

const HomepageUserFeed = () => {
  const { user } = useAuth();
  const [userState, setUserState] = useState<User[]>([]);
  const [userFeed, setUserFeed] = useState<Feed[]>([]);

  const handleActivity = async () => {
    user!.following.map(async (usr: { name: string }) => {
      //rewrite all fetches to axios
      const data = await fetch(`/user/${usr.name}`, {});
      const response = await data.json();
      userState
        ? setUserState((currState: User[]) => [...currState, response])
        : setUserState(response);
    });
  };

  useEffect(() => {
    handleActivity();
  }, [user]);

  useEffect(() => {
    const arr = [] as Feed[];
    userState.slice(0, user?.following.length).map((user: User) =>
      user.user.feed.map((feed: Feed) => {
        if (userState.length > 0 && userState.map((user: User) => user.created !== feed.created)) {
          arr.push(feed);
        } else {
          arr.push(...userFeed);
        }
      })
    );
    setUserFeed(arr);
  }, [userState]);

  const sorted = userFeed.sort(
    (a: { created: string }, b: { created: string }) =>
      Number(new Date(b.created)) - Number(new Date(a.created))
  );

  return (
    <>
      {userFeed.length === 0 ? (
        <Typography>
          You're not following anyone yet. Browse{" "}
          <a href="/Cinema-log/#/search/allusers/multi">users</a> and find someone who shares the
          same interests as you.
        </Typography>
      ) : (
        <UserFeed feed={sorted} name={"Friend Activity"} />
      )}
    </>
  );
};

export default HomepageUserFeed;
