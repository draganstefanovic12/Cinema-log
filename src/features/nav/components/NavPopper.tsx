import { usePopper } from "@/features/nav/hooks/usePopper";
import { Button, ClickAwayListener, Grow, Paper, Popper } from "@mui/material";

type NavPopperProps = {
  button: JSX.Element | string | undefined;
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavPopper = ({ children, button, open, setOpen }: NavPopperProps) => {
  const { anchorRef } = usePopper();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="nav-popper">
      <Button
        onClick={handleOpen}
        className="nav-popper-btn"
        sx={{
          backgroundColor: open ? "#161b22" : "#161b22",
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
              <ClickAwayListener onClickAway={handleToggle}>{children}</ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default NavPopper;
