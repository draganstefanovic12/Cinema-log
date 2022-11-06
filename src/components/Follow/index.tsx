import { User } from "@/pages/Profile/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { handleFollowOrUnfollow } from "@/features/api/backendApi";

type FollowProps = {
  followedUser: string | undefined;
};

const Follow = ({ followedUser }: FollowProps) => {
  const { user } = useAuth();

  const checkIfFollowing = user.following.map((users: User) => users.name === followedUser);

  const handleFollow = () => {
    handleFollowOrUnfollow(followedUser);
  };

  return (
    <Container className="follow-container">
      <ListItem className="follow-list-item" onClick={handleFollow} button>
        {checkIfFollowing ? "Unfollow" : "Follow"}
      </ListItem>
    </Container>
  );
};

export default Follow;
