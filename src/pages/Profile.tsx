import { Avatar, Divider, Grid, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Movies } from "../components/Movies";
import { UserFeed } from "../components/UserFeed";
import { useFetch } from "../hooks/useFetch";

export const Profile = () => {
  const params = useParams();
  const data = useFetch(`http://localhost:5000/user/${params.user}`);

  const [state, setState] = useState<string>();

  return (
    <div className="profile-container">
      <Container
        sx={{
          borderTopRightRadius: "1em",
          borderTopLeftRadius: "1em",
          backgroundColor: "#0f172a",
          paddingTop: "1em",
        }}
      >
        {data && (
          <Grid container>
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
              sx={{
                height: "2em",
                display: "flex",
                flexDirection: "space-around",
              }}
              xs={2}
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
              </Typography>
            </Grid>
            <Grid
              item
              xs={7}
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
                onClick={() => setState("movies")}
                sx={{
                  justifyContent: "center",
                  backgroundColor: state === "movies" ? "#141c30" : "#0f172a",
                }}
                button
              >
                Movies
              </ListItem>
              <Divider orientation="vertical" />
              <ListItem
                onClick={() => setState("shows")}
                sx={{
                  justifyContent: "center",
                  backgroundColor: state === "shows" ? "#141c30" : "#0f172a",
                }}
                button
              >
                TV Shows
              </ListItem>
            </Grid>
          </Grid>
        )}
      </Container>
      {data && (
        <>
          {state === "feed" && <UserFeed feed={data.data.user.feed} />}
          {state === "movies" && <Movies movies={data.data.user.movies} />}
          {state === "shows"}
        </>
      )}
    </div>
  );
};
