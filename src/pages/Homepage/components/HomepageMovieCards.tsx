import { Media } from "@/pages/MediaPage/types";
import { useQuery } from "react-query";
import { getTopRatedOrTrending } from "@/features/api/backendApi";
import { Card, CardMedia, Typography } from "@mui/material";

type HomepageMovieCardsProps = {
  query: string;
  name: string;
};

const HomepageMovieCards = ({ query, name }: HomepageMovieCardsProps) => {
  const { data } = useQuery(
    ["homepage_lists"],
    () => {
      return getTopRatedOrTrending(query);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return (
    <div>
      <Typography variant="h5">{name}</Typography>
      <div className="homepage-movie-cards-cont similar">
        {data &&
          data.results.slice(0, 10).map((movie: Media) => (
            <a key={movie.id} href={`/Cinema-log/#/movie/${movie.id}`}>
              <Card className="movie-card-link" variant="outlined">
                <CardMedia
                  className="movie-card-link-img"
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  height="250"
                />
              </Card>
            </a>
          ))}
      </div>
    </div>
  );
};

export default HomepageMovieCards;
