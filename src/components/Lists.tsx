import {
  Button,
  CardMedia,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NewList } from "./NewList";
import { ListsProps } from "../types/types";

interface List {
  name: string;
  content: [];
  createdAt: string;
  updatedAt?: string;
  description: string;
}

export const Lists = ({ list, usr, setLists }: any) => {
  const [add, setAdd] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <Container className="profile-list-cont">
      {usr === user?.username && (
        <Button onClick={() => setAdd(!add)} className="btn-new-list">
          New List
        </Button>
      )}
      <Container
        sx={{ height: "52em", color: "#cccccc" }}
        className="profiles-lists"
      >
        {list &&
          list.map((list: List) => (
            <Fragment key={list.name}>
              <Link style={{ width: "25em" }} to={`/list/${list.name}`}>
                <Typography variant="h5" sx={{ display: "flex" }}>
                  {list.name}
                </Typography>
                <div style={{ display: "flex", width: "20em" }}>
                  {list.content
                    .slice(0, 4)
                    .map((movImg: { poster_path: string }) => (
                      <CardMedia
                        key={movImg.poster_path}
                        className="list-img"
                        component="img"
                        height="200"
                        src={`https://image.tmdb.org/t/p/w500/${movImg.poster_path}`}
                      />
                    ))}
                </div>
              </Link>
            </Fragment>
          ))}
        {add && <NewList setLists={setLists} setAdd={setAdd} usr={usr} />}
      </Container>
    </Container>
  );
};
