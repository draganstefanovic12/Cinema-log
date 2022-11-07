import { User } from "@/pages/Profile/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ListItem } from "@mui/material";
import { handleFollowOrUnfollow } from "@/features/api/backendApi";
import { useMutation, useQueryClient } from "react-query";

type FollowProps = {
  followedUser: string | undefined;
};

const Follow = ({ followedUser }: FollowProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const mutateFollowUser = useMutation(handleFollowOrUnfollow, {
    //refetches user data on follow/unfollow to keep it synced
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
      queryClient.invalidateQueries("user");
    },
  });

  const checkIfFollowing = user.following.find((users: User) => users.name === followedUser);

  const handleFollow = () => {
    mutateFollowUser.mutate(followedUser);
  };

  return (
    <ListItem className="follow-list-item" onClick={handleFollow} button>
      {checkIfFollowing ? "Unfollow" : "Follow"}
    </ListItem>
  );
};

export default Follow;
