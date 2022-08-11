import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { UserModel } from "../types/types";

export const ProfileFollowersFollowing = ({ name, list }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
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
          {name}
        </DialogTitle>
        {list.map((user: UserModel) => (
          <Fragment key={user._id}>
            <Avatar src={`http://localhost:5000${user.avatar}`} />
            <Typography>{user.username}</Typography>
          </Fragment>
        ))}
      </DialogActions>
    </Dialog>
  );
};
