import { Link } from "react-router-dom";
import { query } from "../types";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { UserModel } from "@/pages/Profile/types";
import { searchUsers } from "@/features/api/backendApi";
import { Avatar, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";

const SearchUsers = ({ query }: query) => {
  const queryOptions = query === "allusers" ? "all/allusers/" : `user/${query}`;
  const { isLoading, data } = useQuery(["search_person", query], () => {
    return searchUsers(queryOptions);
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className="user-search">
      {data.map(({ username, avatar, _id }: UserModel) => (
        <Link className="user-search-link" key={_id} to={`/user/${username}`}>
          <Avatar src={avatar} />
          <p>{username}</p>
        </Link>
      ))}
    </ul>
  );
};

export default SearchUsers;
