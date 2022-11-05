import { Container } from "@mui/material";
import UserFeed from "@/components/UserFeed";
import { ProfileFeedProps } from "@/components/UserFeed";
import ProfileFavorites from "./ProfileFavorites";

const ProfileInfo = ({ feed, favorites }: ProfileFeedProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed name="User Feed" feed={feed} />
      <ProfileFavorites favorites={favorites} />
    </Container>
  );
};

export default ProfileInfo;
