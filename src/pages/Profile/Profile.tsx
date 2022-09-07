import { List } from "../../types/types";
import { Lists } from "../../components/Lists/Lists";
import { Follow } from "../../components/Follow/Follow";
import { useAuth } from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { ProfileInfo } from "../../components/ProfileInfo/ProfileInfo";
import { MoviesOrShows } from "../../components/MoviesOrShows/MoviesOrShows";
import { DialogComponent } from "../../components/DialogComponent/DialogComponent";
import { ImageUploadForm } from "../../components/ImageUploadForm/ImageUploadForm";
import { ListItemComponent } from "../../components/ListItemComponent/ListItemComponent";
import { useEffect, useState } from "react";
import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";

//Different states on profile you can toggle through
const states = [
  { child: "Profile", type: "feed" },
  { child: "Movies", type: "movie" },
  { child: "Shows", type: "tv" },
  { child: "Lists", type: "lists" },
];

export const Profile = () => {
  const [state, setState] = useState<string>("feed");
  const [imgSrc, setImgSrc] = useState<string>();
  const [upload, setUpload] = useState<boolean>(false);
  const { user, userStats } = useAuth();
  const [list, setLists] = useState<List[] | undefined>(undefined);
  const params = useParams();

  const data = useFetch(`https://media-log.herokuapp.com/user/${params.user}`);

  const handleToggle = () => {
    setUpload(!upload);
  };

  useEffect(() => {
    data &&
      setImgSrc(`https://media-log.herokuapp.com${data.data.user.avatar[0]}`);
    data && setLists(data.data.user.lists);
    setState("feed");
  }, [data]);

  return (
    <>
      {userStats && data ? (
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
                          className="profile-avatar"
                          onClick={handleToggle}
                          sx={{ height: "7.5em", width: "7.5em" }}
                          variant="square"
                          src={imgSrc}
                        />
                      }
                    />
                  ) : (
                    <Avatar
                      className="profile-avatar"
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
                    className="profile-name"
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
                          followComparison={userStats!.following}
                          children={data.data.user.followers}
                          name={"Followers"}
                          number={data.data.user.followers.length}
                          currUser={userStats!.username}
                        />
                        <DialogComponent
                          followComparison={userStats!.following}
                          children={data.data.user.following}
                          name={"Following"}
                          number={data.data.user.following.length}
                          currUser={userStats!.username}
                        />
                      </div>
                    </div>
                  </Typography>
                </Grid>
                <Grid
                  className="list-item-comp"
                  item
                  xs={5}
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignSelf: "end",
                    color: "#CCCCCC",
                  }}
                >
                  {states.map((types: any) => (
                    <ListItemComponent
                      setState={setState}
                      state={state}
                      name={types.type}
                    >
                      {types.child}
                    </ListItemComponent>
                  ))}
                </Grid>
                <Grid sx={{ marginLeft: "5.5rem" }}>
                  {user && params.user !== user?.username && (
                    <Follow
                      getClass={"follow-button"}
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
        <CircularProgress className="spinner" />
      )}
    </>
  );
};
