import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  MenuItem,
  Typography,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Media, User } from "../types/types";

type MediaPageRecommendProps = {
  media: Media;
  params: any;
};

export const MediaPageRecommend = ({
  media,
  params,
}: MediaPageRecommendProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, userStats } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRecommend = async (usr: string) => {
    await axios(`http://localhost:5000/user/recommendation/${usr}/`, {
      method: "POST",
      headers: {
        Authorization: `${user?.username} ${user?.token}`,
      },
      data: {
        recUser: userStats?.data.user.username,
        movie: JSON.stringify(media),
      },
    });
  };

  return (
    <>
      <ListItem onClick={handleOpen} button sx={{ whiteSpace: "nowrap" }}>
        <RecommendIcon />
        <Typography>
          Recommend this {params.type === "tv" ? "show" : "movie"} to someone
        </Typography>
      </ListItem>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#14181c",
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#14181c",
            }}
            id="alert-dialog-title"
          >
            {"Recommend the movie to..."}
          </DialogTitle>
          {userStats?.data.user.following.map((User: User) => (
            <MenuItem
              dense
              sx={{ display: "flex" }}
              key={User.name}
              onClick={() => {
                handleRecommend(User.name);
                handleClose();
              }}
            >
              <Avatar
                sx={{ marginRight: "1rem" }}
                src={
                  User.avatar && `https://media-log.herokuapp.com${User.avatar}`
                }
              />
              {User.name}
            </MenuItem>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
};
