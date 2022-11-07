import { Container } from "@mui/material";
import { UserFeedProps } from "@/components/UserFeed";
import UserFeed from "@/components/UserFeed";
import ProfileFavorites from "./ProfileFavorites";

const ProfileInfo = ({ feed, favorites }: UserFeedProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed name="User Feed" feed={feed} />
      <ProfileFavorites favorites={favorites} />
    </Container>
  );
};

export default ProfileInfo;
