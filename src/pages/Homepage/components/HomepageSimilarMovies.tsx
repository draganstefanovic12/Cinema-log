import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useQuery } from "react-query";
import { getRecommendations } from "@/features/api/backendApi";
import { Card, CardMedia, Typography } from "@mui/material";

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
      <Typography sx={{ marginBottom: "0.5rem" }} variant="h5">
        Recommendations based on what you already watched
      </Typography>
      <div className="similar">
        {data &&
          data.results.slice(0, 10).map((movie: Media) => (
            <Link style={{ width: "10.1rem" }} key={movie.id} to={`/movie/${movie.id}`}>
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-link-img"
                  component="img"
                  sx={{ width: "9.9rem" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  height="250"
                />
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomepageSimilarMovies;
