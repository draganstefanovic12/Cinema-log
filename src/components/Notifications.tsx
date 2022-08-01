import {
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  ListItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface NotificationProps {
  notifications: [];
}

interface Notification {
  content: string | undefined;
  createdAt: string | number | Date;
  user: string | undefined;
}

export const Notifications = ({ notifications }: NotificationProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

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
        {<NotificationsNoneOutlinedIcon className="notification-icon" />}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
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
                <MenuList
                  sx={{
                    width: "auto",
                    color: "rgb(102, 125, 147)",
                    backgroundColor: "#141c30",
                  }}
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification: Notification) => (
                      <ListItem style={{ whiteSpace: "nowrap" }}>
                        <Link
                          style={{ marginRight: "0.2em" }}
                          to={`/user/${notification.user}`}
                          onClick={handleClose}
                        >
                          {notification.user}{" "}
                        </Link>{" "}
                        {notification.content}{" "}
                        <span style={{ marginLeft: "0.5em" }}>
                          {formatDistanceToNow(
                            new Date(notification.createdAt)
                          )}{" "}
                          ago
                        </span>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem style={{ color: "white" }}>
                      No new notifications...
                    </ListItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
