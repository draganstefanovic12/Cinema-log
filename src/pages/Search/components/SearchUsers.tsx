import { query } from "../types";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { UserModel } from "@/pages/Profile/types";
import { searchUsers } from "@/features/api/backendApi";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";

const SearchUsers = ({ query }: query) => {
  const queryOptions = query === "allusers" ? "all/allusers/" : `user/${query}`;
  const { isLoading, data } = useQuery(["search_person", query], () => {
    return searchUsers(queryOptions);
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="user-search">
      {data.length > 0 && (
        <Typography variant="h5" sx={{ color: "#cccccc" }}>
          Users:
        </Typography>
      )}
      {data.map(
        ({
          username,
          avatar,
          movies: { watched },
          shows: { watched: swatched },
          followers,
          following,
          _id,
        }: UserModel) => (
          <Card key={_id}>
            <CardContent className="user-search-card-content">
              <a href={`/Cinema-log/#/user/${username}`}>
                <Grid container>
                  <Grid>
                    <Avatar variant="square" src={`${avatar}`} />
                  </Grid>
                  <Grid className="user-grid-text">
                    <Typography variant="h5">{username}</Typography>
                    <div className="div-wrapper">
                      <div className="user-text">
                        <Typography>Movies watched: {watched.length}</Typography>
                        <Typography>TV Shows watched: {swatched.length}</Typography>
                      </div>
                      <div>
                        <Typography>Followers: {followers.length}</Typography>
                        <Typography>Following: {following.length}</Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </a>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
};

export default SearchUsers;
