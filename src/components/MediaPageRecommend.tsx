import {
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
  const { userStats } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRecommend = async (user: string) => {
    await axios.post(`http://localhost:5000/user/recommendation/${user}/`, {
      recUser: userStats?.data.user.username,
      movie: JSON.stringify(media),
    });
  };

  return (
    <>
      <ListItem onClick={handleOpen} button sx={{ whiteSpace: "nowrap" }}>
        <RecommendIcon sx={{ marginRight: "0.5rem" }} />
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
              key={User.name}
              onClick={() => {
                handleRecommend(User.name);
                handleClose();
              }}
            >
              {User.name}
            </MenuItem>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
};
