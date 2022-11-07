import Follow from "@/components/Follow";
import ProfileInfo from "./components/ProfileInfo";
import ProfileMedia from "./components/ProfileMedia";
import ProfileLists from "./components/ProfileLists";
import DialogComponent from "@/components/DialogComponent";
import ListItemComponent from "./components/ProfileListItemComponent";
import ProfileImageUploadForm from "./components/ProfileImageUploadForm";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getUser } from "@/features/api/backendApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";

//Different states on profile you can toggle through
const states = [
  { child: "Profile", type: "feed" },
  { child: "Movies", type: "movie" },
  { child: "Shows", type: "tv" },
  { child: "Lists", type: "lists" },
];

type States = {
  child: string;
  type: string;
};

export const Profile = () => {
  const [state, setState] = useState<string>("feed");
  const [upload, setUpload] = useState<boolean>(false);
  const { user } = useAuth();
  const params = useParams();

  const { isLoading, data } = useQuery(["user", params], () => {
    return getUser(params?.user);
  });

  const handleToggle = () => {
    setUpload(!upload);
  };

  if (isLoading) {
    return <CircularProgress className="spinner" />;
  }

  //destructuring user for more readability
  const {
    username,
    bio,
    movies: { watched },
    shows: { watched: showsWatched },
    following,
    followers,
    avatar,
    feed,
    favorites,
  } = data;

  //if logged in user and current profile user are not the same user wont be able
  //to change the avatar
  const avatarComponent = (
    <Avatar className="profile-avatar" onClick={handleToggle} src={avatar[0]} />
  );

  return (
    <div className="profile-container">
      <Container className="profile-container-grid" disableGutters>
        <Grid container className="profile-container-grid-1">
          {user && user.username === params.user && (
            <ProfileImageUploadForm current={avatarComponent} />
          )}
          {user && user.username !== params.user && avatarComponent}
          <Grid className="profile-container-grid-2" item xs={3}>
            <Typography className="profile-name" align="left" variant="h4">
              {username}
              <div>
                {bio && <Typography>{bio}</Typography>}
                <div className="profile-details">
                  <Typography variant="subtitle1">Movies watched: {watched.length}</Typography>
                  <Typography variant="subtitle1">
                    TV Shows watched: {showsWatched.length}
                  </Typography>
                  <DialogComponent
                    followComparison={user && user!.following}
                    children={followers}
                    name={"Followers: "}
                    number={followers.length}
                    currUser={user && user!.username}
                  />
                  <DialogComponent
                    followComparison={user && user!.following}
                    children={following}
                    name={"Following: "}
                    number={following.length}
                    currUser={user && user!.username}
                  />
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid className="profile-container-grid-3" item xs={5}>
            {states.map((types: States, i) => (
              <ListItemComponent key={i} setState={setState} state={state} name={types.type}>
                {types.child}
              </ListItemComponent>
            ))}
          </Grid>
          {user && params.user !== user?.username && <Follow followedUser={params.user} />}
        </Grid>
      </Container>
      {state === "feed" && <ProfileInfo name="User Feed" favorites={favorites} feed={feed} />}
      {state === "movie" && <ProfileMedia type={state} user={params.user} media={data.movies} />}
      {state === "tv" && <ProfileMedia type={state} user={params.user} media={data.shows} />}
      {state === "lists" && <ProfileLists list={data.lists} usr={params.user} />}
    </div>
  );
};
