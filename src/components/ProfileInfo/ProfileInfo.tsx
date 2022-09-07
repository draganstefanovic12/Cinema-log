import { Container } from "@mui/material";
import { Favorites } from "../Favorites/Favorites";
import { ProfileFeedProps, UserFeed } from "../UserFeed/UserFeed";

export const ProfileInfo = ({ feed, favorites }: ProfileFeedProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed name="User Feed" feed={feed} />
      <Favorites favorites={favorites} />
    </Container>
  );
};
