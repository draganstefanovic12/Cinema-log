import { Media } from "@/pages/MediaPage/types";
import { useQuery } from "react-query";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ListToParse } from "@/pages/List/types";
import { getHomepageLists } from "@/features/api/backendApi";
import { CardMedia, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";

const HomepageLists = () => {
  const navigate = useNavigate();
  const { isLoading, data: lists } = useQuery(["lists"], getHomepageLists, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="homepage-list-cont">
      <Typography className="homepage-list-cont-text" variant="h6">
        New Lists
      </Typography>
      <div className="homepage-list-cont-card-cont">
        <div className="main-page-list-container">
          {lists.slice(0, 3).map((list: ListToParse) => (
            <div key={list.name} className="main-page-list">
              <Typography
                className="main-page-list-name svg"
                variant="subtitle1"
                onClick={() => navigate(`list/${list.name}`)}
              >
                {list.name}
              </Typography>
              <Typography variant="subtitle2" className="list-created-by">
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
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                      />
                    </Fragment>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p>
        Browse <a href="/Cinema-log/#/search/alllists/multi/1">all lists</a> and discover new media
        to watch.
      </p>
    </div>
  );
};

export default HomepageLists;
