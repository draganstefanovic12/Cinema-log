import "./styles/searchusers.css";
import { useFetch } from "../../hooks/useFetch";
import { Container } from "@mui/system";
import { query, UserModel } from "../../types/types";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

const SearchUsers = ({ query }: query) => {
  const users = useFetch(
    query === "allusers" ? `/user/all/allusers/` : `/user/user/${query}`
  );

  return (
    <>
      {users && (
        <Container className="user-search">
          {users.data.length > 0 && (
            <Typography variant="h5" sx={{ color: "#cccccc" }}>
              Users:
            </Typography>
          )}
          {users.data.map((user: UserModel) => (
            <Card key={user._id}>
              <CardContent className="user-search-card-content">
                <a href={`/Cinema-log/#/user/${user.username}`}>
                  <Grid container>
                    <Grid>
                      <Avatar
                        sx={{ height: "5em", width: "5em" }}
                        variant="square"
                        src={`${user.avatar}`}
                      />
                    </Grid>
                    <Grid className="user-grid-text">
                      <Typography variant="h5">{user.username}</Typography>
                      <div className="div-wrapper">
                        <div className="user-text">
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
      )}
    </>
  );
};

export default SearchUsers;
