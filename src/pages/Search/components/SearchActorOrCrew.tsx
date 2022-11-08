import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { Container, Typography } from "@mui/material";

type SearchMediaProps = {
  result: {
    results: Media[];
  };
};

const SearchActorOrCrew = ({ result }: SearchMediaProps) => {
  const filteredResults = result.results.filter(
    (data: Media) => data.profile_path !== null && data.media_type === "person"
  );

  return (
    <Container className="search-person-container">
      <ul className="search-person-ul">
        {filteredResults.map((data: Media) => (
          <Link key={data.id} className="person" to={`/person/${data.id}`}>
            <img
              className="search-person-img"
              alt="person"
              src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
            />
            <Typography className="movie-card-name" variant="subtitle2">
              {data.name}
            </Typography>
          </Link>
        ))}
      </ul>
    </Container>
  );
};

export default SearchActorOrCrew;
