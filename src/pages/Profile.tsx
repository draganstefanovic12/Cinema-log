import { Avatar, Divider, Grid, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { UserFeed } from "../components/UserFeed";
import { useFetch } from "../hooks/useFetch";

export const Profile = () => {
  const params = useParams();
  const data = useFetch(`http://localhost:5000/user/${params.user}`);
  data && console.log(data);
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
              xs={1}
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
              <ListItem sx={{ justifyContent: "center" }} button>
                User Feed
              </ListItem>
              <Divider orientation="vertical" />
              <ListItem sx={{ justifyContent: "center" }} button>
                Movies
              </ListItem>
              <Divider orientation="vertical" />
              <ListItem sx={{ justifyContent: "center" }} button>
                TV Shows
              </ListItem>
            </Grid>
          </Grid>
        )}
      </Container>
      {data && <UserFeed feed={data.data.user.feed} />}
    </div>
  );
};