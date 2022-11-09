import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import UserFeed from "@/components/UserFeed";

const HomepageUserFeed = () => {
  const { user } = useAuth();

  return (
    <>
      {user && user.followedUsersFeed.length === 0 && (
        <p>
          You're not following anyone yet. Browse <Link to="/search/allusers/multi/1">users</Link>{" "}
          and find someone who shares the same interests as you.
        </p>
      )}
      {user && user.followedUsersFeed.length > 0 && (
        <UserFeed feed={user.followedUsersFeed} name={"Friend Activity"} />
      )}
    </>
  );
};

export default HomepageUserFeed;
