import { Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type User = {
  user: {
    feed: [];
  };
};

type Feed = {
  user: string;
  content: string;
  content2: string;
  content3: string;
  created: string;
  name: string;
  sort: any;
  id: string;
  type: string;
};

export const HomepageUserFeed = () => {
  const { userStats } = useAuth();
  const [userState, setUserState] = useState<any>([]);
  const [userFeed, setUserFeed] = useState<any>([]);
  const navigate = useNavigate();

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

  return (
    <div className="main-page-user-feed">
      {sorted.map((feed: Feed) => (
        <Typography key={feed.created} component={"span"}>
          <div className="main-page-user-feed-cont">
            <div style={{ gridColumn: "1" }}>
              <span
                className="user"
                onClick={() => navigate(`/user/${feed.user}`)}
              >
                {feed.user}{" "}
              </span>
              {feed.content} {feed.content2 && feed.content2}{" "}
              {feed.type ? (
                <span
                  style={{ color: "#fff" }}
                  onClick={() => navigate(`/${feed.type}/${feed.id}`)}
                >
                  {feed.name}
                </span>
              ) : (
                <span
                  style={{ color: "#fff" }}
                  onClick={() => navigate(`/user/${feed.content3}`)}
                >
                  {feed.content3}
                </span>
              )}
            </div>
            <span style={{ color: "rgb(102, 125, 147)", gridColumn: "2" }}>
              {formatDistanceToNow(new Date(feed.created))} ago
            </span>
          </div>
        </Typography>
      ))}
    </div>
  );
};
