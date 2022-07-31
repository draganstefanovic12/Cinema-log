import { Avatar, Divider, Grid, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesOrShows } from "../components/MoviesOrShows";
import { UserFeed } from "../components/UserFeed";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Follow } from "./Follow";

export const Profile = () => {
  const [state, setState] = useState<string>("feed");
  const { user } = useAuth();
  const params = useParams();

  const data = useFetch(`http://localhost:5000/user/${params.user}`);

  return (
    <div className="profile-container">
      <Container
        sx={{
          backgroundColor: "#0f172a",
          paddingTop: "1em",
        }}
      >
        {data && (
          <Grid container sx={{ width: "100%" }}>
            <Grid>
              <Avatar
                sx={{ height: "10em", width: "10em" }}
                variant="square"
              ></Avatar>
              <Typography
                sx={{ marginTop: "1em" }}
                align="center"
                color="white"
              >
                Joined: {data.data.user.createdAt.slice(0, 4)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                height: "2em",
                display: "flex",
                flexDirection: "space-between",
              }}
              xs={4}
            >
              <Typography
                align="left"
                variant="h4"
                color="white"
                sx={{ marginLeft: "1em" }}
              >
                {data.data.user.username}
                {data.data.user.bio && (
                  <Typography>{data.data.user.bio}</Typography>
                )}
                <Typography>
                  Movies watched: {data.data.user.movies.watched.length}
                </Typography>
                <Typography>
                  Shows watched: {data.data.user.shows.watched.length}
                </Typography>
                <Typography>
                  Followers: {data.data.user.followers.length}
                </Typography>
                <Typography>
                  Following: {data.data.user.following.length}
                </Typography>
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                height: "2em",
                display: "flex",
                width: "100%",
                alignSelf: "end",
                color: "white",
              }}
            >
              <ListItem
                onClick={() => setState("feed")}
                sx={{
                  justifyContent: "center",
                  backgroundColor: state === "feed" ? "#141c30" : "#0f172a",
                }}
                button
              >
                User Feed
              </ListItem>
              <Divider orientation="vertical" />
              <ListItem
                onClick={() => setState("movie")}
                sx={{
                  justifyContent: "center",
                  backgroundColor: state === "movie" ? "#141c30" : "#0f172a",
                }}
                button
              >
                Movies
              </ListItem>
              <Divider orientation="vertical" />
              <ListItem
                onClick={() => setState("tv")}
                sx={{
                  justifyContent: "center",
                  backgroundColor: state === "tv" ? "#141c30" : "#0f172a",
                }}
                button
              >
                TV Shows
              </ListItem>
            </Grid>
            {params.user !== user?.username && (
              <Follow
                user={user?.username}
                followedUser={params.user}
                followers={data.data.user.followers}
              />
            )}
          </Grid>
        )}
      </Container>
      {data && (
        <>
          {state === "feed" && <UserFeed feed={data.data.user.feed} />}
          {state === "movie" && (
            <MoviesOrShows
              type={state}
              user={params.user}
              movies={data.data.user.movies}
            />
          )}
          {state === "tv" && (
            <MoviesOrShows
              type={state}
              user={params.user}
              movies={data.data.user.shows}
            />
          )}
        </>
      )}
    </div>
  );
};
