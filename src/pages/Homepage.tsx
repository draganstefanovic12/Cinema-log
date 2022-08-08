import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomepageLists } from "../components/HomepageLists";
import { HomepageUserFeed } from "../components/HomepageUserFeed";
import { TrendingMovies } from "../components/TrendingMovies";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

interface Movie {
  name: string;
  vote_average: number;
  id: number;
}

export const Homepage = () => {
  return (
    <Container
      maxWidth="xl"
      className="main-page-cont"
      sx={{ marginTop: "5em" }}
    >
      <div>
        <Container>
          <Typography>Recommended based on the things you watched</Typography>
        </Container>
        {/* <TrendingMovies /> */}
      </div>
      <Container className="main-page-feed-cont">
        <Typography sx={{ marginBottom: "1em" }} variant="h5">
          Friend Activity
        </Typography>
        <HomepageUserFeed />
        <HomepageLists />
      </Container>
    </Container>
  );
};
