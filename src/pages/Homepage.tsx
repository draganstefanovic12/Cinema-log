import { Container } from "@mui/system";
import { HomepageLists } from "../components/HomepageLists";
import { HomepageUserFeed } from "../components/HomepageUserFeed";
import { SimilarMovies } from "../components/SimilarMovies";
import { HomepageMovieCards } from "../components/HomepageMovieCards";

export const Homepage = () => {
  return (
    <Container
      maxWidth="xl"
      className="main-page-cont"
      sx={{ marginTop: "5em" }}
    >
      <div>
        <SimilarMovies />
        <HomepageMovieCards
          query={`http://localhost:5000/imdb/toprated`}
          name={"Top Rated"}
        />
        <HomepageMovieCards
          query={`http://localhost:5000/imdb/trending`}
          name={"Trending Movies"}
        />
      </div>
      <Container className="main-page-feed-cont">
        <HomepageUserFeed />
        <HomepageLists />
      </Container>
    </Container>
  );
};
