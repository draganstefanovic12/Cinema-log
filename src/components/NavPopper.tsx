import { usePopper } from "../hooks/usePopper";
import { Button, ClickAwayListener, Grow, Paper, Popper } from "@mui/material";

interface NavPopperProps {
  button: any;
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavPopper = ({
  children,
  button,
  open,
  setOpen,
}: NavPopperProps) => {
  const { anchorRef } = usePopper();

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        style={{ backgroundColor: open ? "#161b22" : "#161b22" }}
        ref={anchorRef}
        id="composition-button"
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
              <ClickAwayListener onClickAway={() => setOpen(!open)}>
                {children}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
