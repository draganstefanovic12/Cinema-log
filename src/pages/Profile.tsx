import { Lists } from "../components/Lists";
import { Follow } from "../components/Follow";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { ProfileInfo } from "../components/ProfileInfo";
import { MoviesOrShows } from "../components/MoviesOrShows";
import { ImageUploadForm } from "../components/ImageUploadForm";
import { DialogComponent } from "../components/DialogComponent";
import { ListItemComponent } from "../components/ListItemComponent";
import { useEffect, useState } from "react";
import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";

export const Profile = () => {
  const [state, setState] = useState<string>("feed");
  const [imgSrc, setImgSrc] = useState<string>();
  const [upload, setUpload] = useState<boolean>(false);
  const { user, userStats } = useAuth();
  const [list, setLists] = useState();
  const params = useParams();

  const data = useFetch(`https://media-log.herokuapp.com/user/${params.user}`);

  const handleToggle = () => {
    setUpload(!upload);
  };

  useEffect(() => {
    data &&
      setImgSrc(`https://media-log.herokuapp.com${data.data.user.avatar[0]}`);
    setLists(userStats?.data.user.lists);
    setState("feed");
  }, [data]);

  return (
    <>
      {data ? (
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
                  {user?.username === params.user ? (
                    <ImageUploadForm
                      setImgSrc={setImgSrc}
                      current={
                        <Avatar
                          onClick={handleToggle}
                          sx={{ height: "7.5em", width: "7.5em" }}
                          variant="square"
                          src={imgSrc}
                        />
                      }
                    />
                  ) : (
                    <Avatar
                      sx={{ height: "7.5em", width: "7.5em" }}
                      variant="square"
                      src={imgSrc}
                    />
                  )}
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
                          TV Shows watched:{" "}
                          {data.data.user.shows.watched.length}
                        </Typography>
                        <DialogComponent
                          followComparison={userStats?.data.user.following}
                          children={data.data.user.followers}
                          name={"Followers"}
                          number={data.data.user.followers.length}
                          currUser={userStats?.data.user.username}
                        />
                        <DialogComponent
                          followComparison={userStats?.data.user.following}
                          children={data.data.user.following}
                          name={"Following"}
                          number={data.data.user.following.length}
                          currUser={userStats?.data.user.username}
                        />
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
                  <ListItemComponent
                    setState={setState}
                    state={state}
                    name={"tv"}
                  >
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
                <Grid sx={{ marginLeft: "5.5rem" }}>
                  {user && params.user !== user?.username && (
                    <Follow
                      typ={"profile"}
                      usr={user?.username}
                      followedUser={params.user}
                      followers={data.data.user.followers}
                    />
                  )}
                </Grid>
              </Grid>
            )}
          </Container>
          {state === "feed" && (
            <ProfileInfo
              name="User Feed"
              favorites={data.data.user.favorites}
              feed={data.data.user.feed}
            />
          )}
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
          {state === "lists" && (
            <Lists list={list} usr={params.user} setLists={setLists} />
          )}
        </div>
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
};
