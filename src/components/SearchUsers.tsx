import { Avatar, Card, Container, Grid, Typography } from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import { query, UserModel } from "../types/types";

export const SearchUsers = ({ query }: query) => {
  const users = useFetch(
    query === "allusers"
      ? `http://localhost:5000/user/all/allusers/`
      : `http://localhost:5000/user/user/${query}`
  );

  return (
    <>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, 12rem)",
          padding: "2rem",
        }}
      >
        {users &&
          users.data.map((user: UserModel) => (
            <Card
              sx={{ width: "12.5rem", marginBottom: "1rem" }}
              key={user._id}
            >
              <a style={{ color: "white" }} href={`/#/user/${user.username}`}>
                <Grid container>
                  <Grid>
                    <Avatar
                      sx={{ height: "10em", width: "10em" }}
                      variant="square"
                      src={`http://localhost:5000${user.avatar}`}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "15rem",
                      color: "#cccccc",
                    }}
                  >
                    <Typography align="center" variant="h5">
                      {user.username}
                    </Typography>
                    <div style={{ padding: "1rem", width: "20rem" }}>
                      <Typography>
                        Movies watched: {user.movies.watched.length}
                      </Typography>
                      <Typography>
                        TV Shows watched: {user.shows.watched.length}
                      </Typography>
                      <Typography>
                        Followers: {user.followers.length}
                      </Typography>
                      <Typography>
                        Following: {user.following.length}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </a>
            </Card>
          ))}
      </div>
    </>
  );
};
