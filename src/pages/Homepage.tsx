import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { HelmetTitle } from "../components/HelmetTitle";
import { HomepageLists } from "../components/HomepageLists";
import { TrendingMovies } from "../components/TrendingMovies";
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
};

export const Homepage = () => {
  const { user, userStats } = useAuth();
  const [userState, setUserState] = useState<any>([]);

  const handleActivity = async () => {
    userStats?.data.user.following.map(async (user: any) => {
      const data = await fetch(`http://localhost:5000/user/${user.name}`);
      const response = await data.json();
      userState
        ? setUserState((currState: any) => [...currState, response])
        : setUserState(response);
    });
  };

  useEffect(() => {
    handleActivity();
  }, [userStats]);

  console.log(userState);

  return (
    <Container className="main-page-cont" sx={{ marginTop: "5em" }}>
      <HelmetTitle title={"Home"} />
      <div>
        <Typography className="welcome-back-main" variant="h2">
          Welcome, {user?.username}
        </Typography>
        {/* <TrendingMovies /> */}
      </div>
      {/* <HomepageLists /> */}
      <div>
        {userState &&
          userState
            .slice(0, userStats?.data.user.following.length)
            .map((user: User) =>
              user.user.feed.map((feed: Feed) => (
                <div>
                  {feed.user} {feed.content} {feed.content2 && feed.content2}{" "}
                  {feed.content3 && feed.content3} {feed.name}
                  {formatDistanceToNow(new Date(feed.created))} ago
                </div>
              ))
            )}
      </div>
    </Container>
  );
};
