import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { UserModel, DialogComponentProps } from "../types/types";
import { Follow } from "./Follow";

export const DialogComponent = ({
  children,
  name,
  currUser,
  followComparison,
  number,
}: DialogComponentProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Typography>
        {name}
        {`: `}
        <span style={{ color: "#fff" }} className="svg" onClick={handleOpen}>
          {number}
        </span>
      </Typography>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            backgroundColor: "#14181c",
          }}
          className="dialog-actions"
        >
          <DialogTitle
            sx={{
              margin: "0 auto",
              backgroundColor: "#14181c",
            }}
            id="alert-dialog-title"
          >
            {name}
          </DialogTitle>
          {children.map((user: UserModel) => (
            <div
              className="profile-foll-cont"
              style={{
                display: "flex",
                margin: "0",
                justifyContent: "space-between",
                alignItems: "center",
                width: "27.5rem",
              }}
            >
              <a
                onClick={handleClose}
                style={{ display: "flex", marginLeft: "1rem" }}
                href={`/Cinema-log/#/user/${user.name}`}
              >
                <Avatar
                  src={
                    user.avatar &&
                    `https://media-log.herokuapp.com${user.avatar}`
                  }
                />
                <ListItem sx={{ width: "5rem" }}>{user.name}</ListItem>
              </a>
              {followComparison && currUser !== user.name && (
                <Follow
                  followers={followComparison}
                  usr={currUser}
                  followedUser={user.name}
                />
              )}
            </div>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
};
