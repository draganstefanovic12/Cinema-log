import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [userState, setUserState] = useState<User[]>([]);
  const [userFeed, setUserFeed] = useState<User[]>([]);
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

  return (
    <Container className="main-page-cont" sx={{ marginTop: "5em" }}>
      <HelmetTitle title={"Home"} />
      <div>
        <Typography className="welcome-back-main" variant="h2">
          Welcome, {user?.username}
        </Typography>
        <TrendingMovies />
      </div>

      <Container className="main-page-feed-cont">
        <Typography sx={{ marginBottom: "1em" }} variant="h4">
          Friend Activity
        </Typography>
        <div className="main-page-user-feed">
          {userState &&
            userState
              .slice(0, userStats?.data.user.following.length)
              .map((user: User) =>
                user.user.feed.map((feed: Feed) => (
                  <div className="main-page-user-feed-cont">
                    <div style={{ gridColumn: "1" }}>
                      <span
                        className="user"
                        onClick={() => navigate(`/user/${feed.user}`)}
                      >
                        {feed.user}
                      </span>{" "}
                      {feed.content} {feed.content2 && feed.content2}{" "}
                      {feed.content3 && feed.content3} {feed.name}
                    </div>
                    <span
                      style={{ color: "rgb(102, 125, 147)", gridColumn: "2" }}
                    >
                      {formatDistanceToNow(new Date(feed.created))} ago
                    </span>
                  </div>
                ))
              )}
        </div>
        <HomepageLists />
      </Container>
    </Container>
  );
};
