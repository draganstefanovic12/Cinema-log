import { Media } from "@/pages/MediaPage/types";
import { useQuery } from "react-query";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ListToParse } from "@/pages/List/types";
import { getHomepageLists } from "@/features/api/backendApi";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const HomepageLists = () => {
  const navigate = useNavigate();
  const { data: lists } = useQuery(["lists"], getHomepageLists, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="homepage-list-cont">
      <Typography className="homepage-list-cont-text" variant="h6">
        New Lists
      </Typography>
      <div className="homepage-list-cont-card-cont">
        <Card className="card-cont-card">
          <CardContent component="div" className="card-cont-card-content">
            <div className="main-page-list-container">
              {lists &&
                lists.slice(0, 3).map((list: ListToParse) => (
                  <div key={list.name}>
                    <Typography
                      className="main-page-list-name svg"
                      variant="h6"
                      onClick={() => navigate(`list/${list.name}`)}
                    >
                      {list.name}
                    </Typography>
                    <Typography className="list-created-by">
                      Created by:
                      <span
                        className="list-username svg"
                        onClick={() => navigate(`/user/${list.username}`)}
                      >
                        {list.username}
                      </span>
                    </Typography>
                    <div className="main-page-list-img-cont">
                      {JSON.parse(list.content)
                        .slice(0, 4)
                        .map((media: Media) => (
                          <Fragment key={media.id}>
                            <CardMedia
                              key={media.id}
                              onClick={() => navigate(`/list/${list.name}`)}
                              component="img"
                              height="200"
                              className="main-page-list-img svg"
                              src={`https://image.tmdb.org/t/p/w500/${media.poster}`}
                            />
                          </Fragment>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Typography>
        Browse <a href="/Cinema-log/#/search/alllists/multi">all lists</a> and discover new media to
        watch.
      </Typography>
    </div>
  );
};

export default HomepageLists;
