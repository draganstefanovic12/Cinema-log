import { usePopper } from "@/hooks/usePopper";
import { Button, ClickAwayListener, Grow, Paper, Popper } from "@mui/material";

type NavPopperProps = {
  button: JSX.Element | string | undefined;
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavPopper = ({ children, button, open, setOpen }: NavPopperProps) => {
  const { anchorRef } = usePopper();

  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: open ? "#161b22" : "#161b22",
          padding: "0",
          color: "#cccccc",
          textTransform: "none",
        }}
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
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(!open)}>{children}</ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default NavPopper;
