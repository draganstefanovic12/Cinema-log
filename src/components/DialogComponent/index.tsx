import { useState } from "react";
import { UserModel } from "@/pages/Profile/types";
import { Avatar, Dialog, DialogActions, DialogTitle, ListItem, Typography } from "@mui/material";
import Follow from "../Follow";

type DialogComponentProps = {
  children: [];
  name: string;
  currUser: string;
  followComparison: [];
  number: number;
};

const DialogComponent = (props: DialogComponentProps) => {
  const { children, name, currUser, followComparison, number } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const DialogChildren = children.map((user: UserModel, i: number) => (
    <div key={i} className="profile-foll-cont">
      <a
        onClick={handleClose}
        className="profile-foll-link"
        href={`/Cinema-log/#/user/${user.name}`}
      >
        <Avatar src={user.avatar && `https://dragpersonalproj.xyz/cinema-log/${user.avatar}`} />
        <ListItem sx={{ width: "5rem" }}>{user.name}</ListItem>
      </a>
      {followComparison && currUser !== user.name && <Follow followedUser={user.name} />}
    </div>
  ));

  return (
    <>
      <Typography>
        {name}
        <span style={{ color: "#fff" }} className="svg dialog-span" onClick={handleOpen}>
          {number}
        </span>
      </Typography>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <DialogActions className="dialog-actions">
          <DialogTitle className="dialog-title" id="alert-dialog-title">
            {name}
          </DialogTitle>
          {DialogChildren}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogComponent;
