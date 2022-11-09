import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { fetchMediaPerson } from "@/features/api/backendApi";
import Spinner from "@/components/Spinner";
import MediaCard from "@/components/MediaCard/MediaCard";
import PersonActedIn from "./components/PersonActedIn";

export const Person = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery(
    ["person", id],
    () => {
      return fetchMediaPerson(id) as Promise<any>;
    },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="person-cont">
      <div className="person-cont-head">
        <MediaCard src={`/w500/${data.profile_path}`} style={{ float: "left" }} />
        <div className="person-cont-text">
          <p>{data.name}</p>
          <p>{data.biography}</p>
        </div>
      </div>
      <PersonActedIn props={data} />
    </Container>
  );
};
