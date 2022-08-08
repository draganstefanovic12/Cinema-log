import { Avatar, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesOrShows } from "../components/MoviesOrShows";
import { ProfileInfo } from "../components/ProfileInfo";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Follow } from "../components/Follow";
import { Lists } from "../components/Lists";
import { ListItemComponent } from "../components/ListItemComponent";

export const Profile = () => {
  const [state, setState] = useState<string>("feed");
  const { user } = useAuth();
  const params = useParams();

  const data = useFetch(`http://localhost:5000/user/${params.user}`);

  return (
    <div className="profile-container">
      <Container
        sx={{
          backgroundColor: "#161b22",
          paddingTop: "1em",
        }}
      >
        {data && (
          <Grid
            container
            sx={{
              width: "100%",
              height: "10.5em",
            }}
          >
            <Grid>
              <Avatar
                sx={{ height: "7.5em", width: "7.5em" }}
                variant="square"
              ></Avatar>
            </Grid>
            <Grid
              item
              sx={{
                height: "2em",
                display: "flex",
                flexDirection: "space-between",
              }}
              xs={3}
            >
              <Typography
                align="left"
                variant="h4"
                color="#efefef"
                sx={{ marginLeft: "1em" }}
              >
                {data.data.user.username}
                <div>
                  {data.data.user.bio && (
                    <Typography>{data.data.user.bio}</Typography>
                  )}
                  <div className="profile-details">
                    <Typography variant="subtitle1">
                      Movies watched: {data.data.user.movies.watched.length}
                    </Typography>
                    <Typography variant="subtitle1">
                      TV Shows watched: {data.data.user.shows.watched.length}
                    </Typography>
                    <Typography variant="subtitle1">
                      Followers: {data.data.user.followers.length}
                    </Typography>
                    <Typography variant="subtitle1">
                      Following: {data.data.user.following.length}
                    </Typography>
                  </div>
                </div>
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                width: "100%",
                alignSelf: "end",
                color: "#CCCCCC",
              }}
            >
              <ListItemComponent
                setState={setState}
                state={state}
                name={"feed"}
              >
                Profile
              </ListItemComponent>
              <ListItemComponent
                setState={setState}
                state={state}
                name={"movie"}
              >
                Movies
              </ListItemComponent>
              <ListItemComponent setState={setState} state={state} name={"tv"}>
                TV Shows
              </ListItemComponent>
              <ListItemComponent
                setState={setState}
                state={state}
                name={"lists"}
              >
                Lists
              </ListItemComponent>
            </Grid>
            {user && params.user !== user?.username && (
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
          {state === "feed" && <ProfileInfo feed={data.data.user.feed} />}
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
          {state === "lists" && <Lists user={params.user} />}
        </>
      )}
    </div>
  );
};
