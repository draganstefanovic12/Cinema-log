import { CardMedia, Container, Typography } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

type List = {
  name: string;
  content: string;
  description: string;
  username: string;
  _id: number;
};

type Content = {
  title: string;
  id: number;
  poster_path: string;
  type: string;
  createdAt: string;
};

export const HomepageLists = () => {
  const data = useFetch("http://localhost:5000/lists/main");
  const navigate = useNavigate();

  return (
    <div
      style={{
        color: "#cccccc",
        width: "35rem",
        gridColumn: "2",
        marginTop: "1rem",
      }}
    >
      <Typography sx={{ marginBottom: "1rem" }} variant="h5">
        New Lists
      </Typography>
      <div className="main-page-list-container">
        {data &&
          data.data.map((list: List) => (
            <div key={list.name}>
              <Typography
                className="main-page-list-name"
                variant="h6"
                onClick={() => navigate(`list/${list.name}`)}
              >
                {list.name}
              </Typography>
              <Typography className="list-created-by">
                Created by:{" "}
                <span
                  className="list-username"
                  onClick={() => navigate(`/user/${list.username}`)}
                >
                  {list.username}
                </span>
              </Typography>
              <div className="main-page-list-img-cont">
                {JSON.parse(list.content)
                  .slice(0, 4)
                  .map((media: Content) => (
                    <Fragment key={media.id}>
                      <CardMedia
                        key={media.id}
                        onClick={() => navigate(`/list/${list.name}`)}
                        component="img"
                        height="200"
                        className="main-page-list-img"
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                      />
                    </Fragment>
                  ))}
              </div>
            </div>
          ))}
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "1rem",
            color: "#fff",
          }}
        >
          See more
        </Typography>
      </div>
    </div>
  );
};
