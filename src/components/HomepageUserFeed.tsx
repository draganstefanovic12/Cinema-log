import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { UserFeed } from "./UserFeed";
import { User, Feed } from "../types/types";

export const HomepageUserFeed = () => {
  const { userStats } = useAuth();
  const [userState, setUserState] = useState<any>([]);
  const [userFeed, setUserFeed] = useState<any>([]);

  const handleActivity = async () => {
    userStats?.data.user.following.map(async (user: { name: string }) => {
      const data = await fetch(`http://localhost:5000/user/${user.name}`);
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
    const arr: Feed[] = [];
    userState
      .slice(0, userStats?.data.user.following.length)
      .map((user: User) =>
        user.user.feed.map((feed: Feed) => {
          if (
            userState.length > 0 &&
            userState.map((user: Feed) => user.created !== feed.created)
          ) {
            arr.push(feed);
          } else {
            arr.push(userFeed);
          }
        })
      );
    setUserFeed(arr);
  }, [userState]);

  const sorted = userFeed.sort(
    (a: { created: string }, b: { created: string }) =>
      Number(new Date(b.created)) - Number(new Date(a.created))
  );

  return <UserFeed feed={sorted} />;
};
