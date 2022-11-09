import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { getRecommendations } from "@/features/api/backendApi";
import MediaCard from "@/components/MediaCard/MediaCard";

const HomepageSimilarMovies = () => {
  const { user } = useAuth();
  const { data } = useQuery(
    ["recommendations"],
    () => {
      const movies = user.movies.watched;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)].id;
      return getRecommendations(randomMovie);
    },
    { enabled: !!user, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return (
    <>
      <Typography variant="h6">Recommendations based on what you already watched</Typography>
      <div className="similar">
        {data &&
          data.results.slice(0, 10).map((movie: Media) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MediaCard src={`/w500/${movie.poster_path}`} width="10rem" height="15rem" />
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomepageSimilarMovies;
