import { Container } from "@mui/material";
import { Favorites } from "./Favorites";
import { UserFeed } from "./UserFeed";
import { ProfileFeedProps } from "../types/types";

export const ProfileInfo = ({ feed }: ProfileFeedProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed name="User Feed" feed={feed} />
      <Favorites />
    </Container>
  );
};
