import { useAuth } from "../context/AuthContext";
import { UserFeed } from "./UserFeed";
import { User, Feed } from "../types/types";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const HomepageUserFeed = () => {
  const { user, userStats } = useAuth();
  const [userState, setUserState] = useState<User[]>([]);
  const [userFeed, setUserFeed] = useState<Feed[]>([]);

  const handleActivity = async () => {
    userStats!.following.map(async (usr: { name: string }) => {
      const data = await fetch(
        `https://media-log.herokuapp.com/user/${usr.name}`,
        {
          headers: {
            Authorization: `${user?.username} ${user?.token}`,
          },
        }
      );
      const response = await data.json();
      userState
        ? setUserState((currState: User[]) => [...currState, response])
        : setUserState(response);
    });
  };

  useEffect(() => {
    handleActivity();
  }, [userStats]);

  useEffect(() => {
    const arr = [] as Feed[];
    userState.slice(0, userStats?.following.length).map((user: User) =>
      user.user.feed.map((feed: Feed) => {
        if (
          userState.length > 0 &&
          userState.map((user: User) => user.created !== feed.created)
        ) {
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
          <a href="/Cinema-log/#/search/allusers/multi">users</a> and find
          someone who shares the same interests as you.
        </Typography>
      ) : (
        <UserFeed feed={sorted} name={"Friend Activity"} />
      )}
    </>
  );
};
