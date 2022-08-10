import { Dialog, DialogActions, DialogTitle, MenuItem } from "@mui/material";
import { useState } from "react";

type DialogComponentProps = {
  children: JSX.Element;
};

export const DialogComponent = ({ children }: DialogComponentProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(open);
  };

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
      <DialogActions className="dialog-actions">
        <DialogTitle
          sx={{
            backgroundColor: "#14181c",
          }}
          id="alert-dialog-title"
        >
          {"Recommend the movie to..."}
        </DialogTitle>
        {children}
      </DialogActions>
    </Dialog>
  );
};
