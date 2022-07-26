import { searchMulti } from "@/features/api/backendApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { SearchSelection } from "./types";
import Spinner from "@/components/Spinner";
import SearchLists from "./components/SearchLists";
import SearchUsers from "./components/SearchUsers";
import SearchMedia from "./components/SearchMedia";
import SearchOptions from "./components/SearchOptions";
import SearchActorOrCrew from "./components/SearchActorOrCrew";

export const Search = () => {
  const query = useParams();
  const [searchSelection, setSearchSelection] = useState<SearchSelection>("media");

  const searchQuery =
    query.type === "multi"
      ? `/multi/${query.query}/`
      : `/discover/${query.query}/${query.type}/${query.offset}`;
  console.log(searchQuery);

  const { isLoading, data } = useQuery(
    ["search", query],
    () => {
      return searchMulti(searchQuery);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="search-container">
      <SearchOptions searchSelection={searchSelection} setSearchSelection={setSearchSelection} />
      {searchSelection === "media" && <SearchMedia data={data} />}
      {query.query === "alllists" && <SearchLists />}
      {searchSelection === "users" && <SearchUsers query={query.query} />}
      {searchSelection === "actors" && <SearchActorOrCrew result={data} />}
    </Container>
  );
};
