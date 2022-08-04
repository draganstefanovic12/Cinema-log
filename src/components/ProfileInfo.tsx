import { Container } from "@mui/material";
import { FavoriteMovies } from "./FavoriteMovies";
import { UserFeed } from "./UserFeed";

interface ProfileProps {
  feed: [
    {
      content: string;
      created: string;
      user: string;
      id?: number;
      name?: string;
      type?: string;
      content2?: string;
      content3: string;
    }
  ];
}

export const ProfileInfo = ({ feed }: ProfileProps) => {
  return (
    <Container className="profile-info-container">
      <UserFeed feed={feed} />
      <FavoriteMovies />
    </Container>
  );
};
