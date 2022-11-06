import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  MenuItem,
  Typography,
} from "@mui/material";
import { User } from "@/pages/Profile/types";
import { Media } from "../types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { Container } from "@mui/system";
import { recommendMedia } from "@/features/api/backendApi";
import RecommendIcon from "@mui/icons-material/Recommend";

type MediaPageRecommendProps = {
  media: Media;
  params: string | undefined;
};

const MediaPageRecommend = ({ media, params }: MediaPageRecommendProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRecommendMedia = (user: string) => {
    const movie = JSON.stringify(media);
    recommendMedia(movie, user);
    handleClose();
  };

  return (
    <>
      <ListItem onClick={handleOpen} button sx={{ whiteSpace: "nowrap" }}>
        <RecommendIcon sx={{ marginRight: "0.5rem" }} />
        <Typography className="ww-li">
          Recommend this {params === "tv" ? "show" : "movie"} to someone
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
            display: "grid",
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
          <Container>
            {user?.following.map((User: User) => (
              <MenuItem
                dense
                sx={{ display: "flex" }}
                key={User.name}
                onClick={() => {
                  handleRecommendMedia(User.name);
                }}
              >
                <Avatar sx={{ marginRight: "1rem" }} src={User.avatar && `${User.avatar}`} />
                {User.name}
              </MenuItem>
            ))}
          </Container>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MediaPageRecommend;
