import axios from "../../features/axios/incerceptor";
import { List } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type RemoveListProps = {
  list: {
    name: keyof List;
    content: object[];
    description: keyof List;
  };
  usr: string | undefined;
};

const RemoveList = ({ usr, list }: RemoveListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRemove = async () => {
    await axios.delete(`/user/deletelist/${usr}`, {
      data: {
        name: list.name,
      },
    });
  };

  const handleRemoveList = async () => {
    await axios.delete(`/lists/delete/${list.name}`);
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
              navigate(`/user/${usr}`);
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

export default RemoveList;
