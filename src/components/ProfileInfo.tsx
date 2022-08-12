import { Container } from "@mui/material";
import { Favorites } from "./Favorites";
import { UserFeed } from "./UserFeed";
import { ProfileFeedProps } from "../types/types";

export const ProfileInfo = ({ feed, favorites }: ProfileFeedProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed name="User Feed" feed={feed} />
      <Favorites favorites={favorites} />
    </Container>
  );
};
