import { useAuth } from "../../context/AuthContext";
import { Container } from "@mui/system";
import SimilarMovies from "../../components/SimilarMovies";
import HomepageLists from "../../components/HomepageLists";
import HomepageUserFeed from "../../components/HomepageUserFeed";
import HomepageMovieCards from "../../components/HomepageMovieCards";

export const Homepage = () => {
  const { userStats } = useAuth();

  const toprated = "/imdb/toprated";
  const trending = "/imdb/trending";

  return (
    <Container
      maxWidth="xl"
      className="main-page-cont"
      sx={{ marginTop: "5em" }}
    >
      <div>
        {userStats?.movies.watched.length !== 0 && <SimilarMovies />}
        <HomepageMovieCards query={toprated} name={"Top Rated"} />
        <HomepageMovieCards query={trending} name={"Trending Movies"} />
      </div>
      <Container className="main-page-feed-cont">
        <HomepageUserFeed />
        <HomepageLists />
      </Container>
    </Container>
  );
};
