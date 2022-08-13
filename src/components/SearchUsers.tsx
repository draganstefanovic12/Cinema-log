import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFetch } from "../hooks/useFetch";
import { query, UserModel } from "../types/types";

export const SearchUsers = ({ query }: query) => {
  const users = useFetch(
    query === "allusers"
      ? `https://media-log.herokuapp.com/user/all/allusers/`
      : `https://media-log.herokuapp.com/user/user/${query}`
  );

  return (
    <>
      <Container
        style={{
          display: "grid",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        {users &&
          users.data.map((user: UserModel) => (
            <Card
              sx={{ width: "40.5rem", marginBottom: "1rem" }}
              key={user._id}
            >
              <CardContent sx={{ backgroundColor: "#14181c" }}>
                <a href={`/Cinema-log/#/user/${user.username}`}>
                  <Grid sx={{ display: "flex" }} container>
                    <Grid>
                      <Avatar
                        sx={{ height: "5em", width: "5em" }}
                        variant="square"
                        src={`https://media-log.herokuapp.com${user.avatar}`}
                      />
                    </Grid>
                    <Grid
                      sx={{
                        width: "10rem",
                        color: "#cccccc",
                      }}
                    >
                      <Typography sx={{ paddingLeft: "1rem" }} variant="h5">
                        {user.username}
                      </Typography>
                      <div
                        style={{
                          paddingTop: "1rem",
                          width: "35rem",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{ marginRight: "1rem", paddingLeft: "1rem" }}
                        >
                          <Typography>
                            Movies watched: {user.movies.watched.length}
                          </Typography>
                          <Typography>
                            TV Shows watched: {user.shows.watched.length}
                          </Typography>
                        </div>
                        <div>
                          <Typography>
                            Followers: {user.followers.length}
                          </Typography>
                          <Typography>
                            Following: {user.following.length}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </a>
              </CardContent>
            </Card>
          ))}
      </Container>
    </>
  );
};
