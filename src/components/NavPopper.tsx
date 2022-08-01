import { Button, ClickAwayListener, Grow, Paper, Popper } from "@mui/material";
import { useRef, useState } from "react";

interface NavPopperProps {
  button: any;
  children: JSX.Element;
}

export const NavPopper = ({ children, button }: NavPopperProps) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: open ? "#141c30" : "#0f172a" }}
        ref={anchorRef}
        id="composition-button"
        onClick={handleToggle}
      >
        {button}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {children}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
