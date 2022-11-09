import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { Container } from "@mui/material";
import SearchPagination from "./SearchPagination";
import MediaCard from "@/components/MediaCard/MediaCard";

interface SearchMediaProps {
  data: {
    results: Media[];
    total_pages: string;
  };
}

const SearchMedia = ({ data }: SearchMediaProps) => {
  const filterSearch = data.results.filter(
    (result: Media) => result.popularity > 6.5 && (result.title || result.first_air_date)
  );

  return (
    <Container className="search-container">
      <ul className="search-container-results">
        {filterSearch.map(
          ({ id, first_air_date, release_date, poster_path, name, title }: Media) => (
            <Link
              key={id}
              className="movie-poster-link"
              to={`/${first_air_date ? "tv" : "movie"}/${id}`}
            >
              <MediaCard src={`/w500/${poster_path}`} />
              <p className="movie-card-name">
                {first_air_date && `${name} (${first_air_date.slice(0, 4)})`}
                {!first_air_date && `${title} (${release_date.slice(0, 4)})`}
              </p>
            </Link>
          )
        )}
      </ul>
      <SearchPagination total_pages={data.total_pages} />
    </Container>
  );
};

export default SearchMedia;
