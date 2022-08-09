import { Container } from "@mui/system";
import { HomepageLists } from "../components/HomepageLists";
import { HomepageUserFeed } from "../components/HomepageUserFeed";
import { SimilarMovies } from "../components/SimilarMovies";
import { TrendingMovies } from "../components/TrendingMovies";

export const Homepage = () => {
  return (
    <Container
      maxWidth="xl"
      className="main-page-cont"
      sx={{ marginTop: "5em" }}
    >
      <div>
        <SimilarMovies />
        <TrendingMovies />
      </div>
      <Container className="main-page-feed-cont">
        <HomepageUserFeed />
        <HomepageLists />
      </Container>
    </Container>
  );
};
