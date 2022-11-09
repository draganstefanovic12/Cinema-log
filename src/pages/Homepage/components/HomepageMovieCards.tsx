import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { getTopRatedOrTrending } from "@/features/api/backendApi";
import MediaCard from "@/components/MediaCard/MediaCard";

interface HomepageMovieCardsProps {
  query: string;
  name: string;
}

const HomepageMovieCards = ({ query, name }: HomepageMovieCardsProps) => {
  const { data } = useQuery(
    ["homepage_lists", query],
    () => {
      return getTopRatedOrTrending(query);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <div className="homepage-movie-cards-cont similar">
        {data &&
          data.results.slice(0, 10).map((movie: Media) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MediaCard src={`/w500/${movie.poster_path}`} style={{ width: "10rem", height: "15rem" }} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HomepageMovieCards;
