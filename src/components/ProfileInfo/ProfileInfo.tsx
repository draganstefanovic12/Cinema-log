import { Container } from "@mui/material";
import UserFeed from "../UserFeed";
import Favorites from "../Favorites";
import { ProfileFeedProps } from "../UserFeed/UserFeed";

const ProfileInfo = ({ feed, favorites }: ProfileFeedProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed name="User Feed" feed={feed} />
      <Favorites favorites={favorites} />
    </Container>
  );
};

export default ProfileInfo;
