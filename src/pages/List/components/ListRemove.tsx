import { List } from "../types";
import { useState } from "react";
import { removeList } from "@/features/api/backendApi";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type RemoveListProps = {
  list: {
    name: keyof List;
    content: object[];
    description: keyof List;
  };
};

const ListRemove = ({ list }: RemoveListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRemoveList = async () => {
    removeList(list.name);
    navigate(`/`);
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
        className="list-remove-dialog"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="dialog-title" id="alert-dialog-title">
          {"Are you sure you want to delete the list?"}
        </DialogTitle>
        <DialogActions className="dialog-actions">
          <Button onClick={handleRemoveList}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListRemove;
