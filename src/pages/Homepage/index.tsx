import { useAuth } from "@/features/auth/context/AuthContext";
import { Container } from "@mui/system";
import HomepageLists from "./components/HomepageLists";
import HomepageUserFeed from "./components/HomepageUserFeed";
import HomepageMovieCards from "./components/HomepageMovieCards";
import HomepageSimilarMovies from "./components/HomepageSimilarMovies";

export const Homepage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="xl" className="main-page-cont" sx={{ marginTop: "5em" }}>
      <div>
        {user?.movies.watched.length !== 0 && <HomepageSimilarMovies />}
        <HomepageMovieCards query={"trending"} name={"Trending Movies"} />
        <HomepageMovieCards query={"toprated"} name={"Top Rated"} />
      </div>
      <Container className="main-page-feed-cont">
        <HomepageUserFeed />
        <HomepageLists />
      </Container>
    </Container>
  );
};
