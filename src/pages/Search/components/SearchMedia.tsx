import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { Container, Typography } from "@mui/material";
import SearchPagination from "./SearchPagination";

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
  console.log(data);

  return (
    <Container className="search-container">
      <ul className="search-container-results">
        {filterSearch.map(
          ({ id, first_air_date, release_date, poster_path, name, title }: Media) => (
            <Link className="movie-poster-link" to={`/${first_air_date ? "tv" : "movie"}/${id}`}>
              <img
                alt="poster"
                className="search-img"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              />
              <Typography className="movie-card-name" align="center" variant="subtitle1">
                {first_air_date && `${name} (${first_air_date.slice(0, 4)})`}
                {!first_air_date && `${title} (${release_date.slice(0, 4)})`}
              </Typography>
            </Link>
          )
        )}
      </ul>
      <SearchPagination total_pages={data.total_pages} />
    </Container>
  );
};

export default SearchMedia;
