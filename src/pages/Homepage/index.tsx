import { useAuth } from "@/features/auth/context/AuthContext";
import { Container } from "@mui/system";
import HomepageLists from "./components/HomepageLists";
import HomepageUserFeed from "./components/HomepageUserFeed";
import HomepageMovieCards from "./components/HomepageMovieCards";
import MediaPageSimilarMovies from "./components/HomepageSimilarMovies";

export const Homepage = () => {
  const { userStats } = useAuth();

  const toprated = "/imdb/toprated";
  const trending = "/imdb/trending";

  return (
    <Container maxWidth="xl" className="main-page-cont" sx={{ marginTop: "5em" }}>
      <div>
        {userStats?.movies.watched.length !== 0 && <MediaPageSimilarMovies />}
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
