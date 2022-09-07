import { useFetch } from "../../hooks/useFetch";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ListToParse, Media } from "../../types/types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export const HomepageLists = () => {
  const data = useFetch("https://media-log.herokuapp.com/lists/main");
  const navigate = useNavigate();

  return (
    <div className="homepage-list-cont">
      <Typography sx={{ marginBottom: "1rem", marginTop: "1em" }} variant="h5">
        New Lists
      </Typography>
      <div style={{ backgroundColor: "#161b22" }}>
        <Card
          sx={{
            color: "#cccccc",
            width: "33rem",
            gridColumn: "2",
            marginTop: "1rem",
          }}
        >
          <CardContent
            component="div"
            sx={{ backgroundColor: "#161b22", padding: "0" }}
          >
            <div className="main-page-list-container">
              {data &&
                data.data.slice(0, 3).map((list: ListToParse) => (
                  <div key={list.name}>
                    <Typography
                      className="main-page-list-name svg"
                      variant="h6"
                      onClick={() => navigate(`list/${list.name}`)}
                    >
                      {list.name}
                    </Typography>
                    <Typography className="list-created-by">
                      Created by:{" "}
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
          </CardContent>
        </Card>
      </div>
      <Typography>
        Browse <a href="/Cinema-log/#/search/alllists/multi">all lists</a> and
        discover new media to watch.
      </Typography>
    </div>
  );
};
