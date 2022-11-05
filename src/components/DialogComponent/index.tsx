import { Avatar, Dialog, DialogActions, DialogTitle, ListItem, Typography } from "@mui/material";
import Follow from "../Follow";
import { useState } from "react";
import { UserModel } from "@/pages/Profile/types";

type DialogComponentProps = {
  children: [];
  name: string;
  currUser: string;
  followComparison: [];
  number: number;
};

const DialogComponent = ({
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
          {children.map((user: UserModel, i: number) => (
            <div
              key={i}
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
                  src={user.avatar && `https://dragpersonalproj.xyz/cinema-log/${user.avatar}`}
                />
                <ListItem sx={{ width: "5rem" }}>{user.name}</ListItem>
              </a>
              {followComparison && currUser !== user.name && (
                <Follow followers={followComparison} usr={currUser} followedUser={user.name} />
              )}
            </div>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogComponent;
