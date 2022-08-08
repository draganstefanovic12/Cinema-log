import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RemoveListProps } from "../types/types";

export const RemoveList = ({ user, list }: RemoveListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRemove = async () => {
    await axios.delete(`http://localhost:5000/user/deletelist/${user}`, {
      data: {
        name: list.name,
      },
    });
  };

  const handleRemoveList = async () => {
    await axios.delete(`http://localhost:5000/lists/delete/${list.name}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Remove</Button>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{ backgroundColor: "#14181c" }}
          id="alert-dialog-title"
        >
          {"Are you sure you want to delete the list?"}
        </DialogTitle>
        <DialogActions sx={{ backgroundColor: "#14181c" }}>
          <Button
            onClick={() => {
              navigate(`/user/${user}`);
              handleRemove();
              handleRemoveList();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
