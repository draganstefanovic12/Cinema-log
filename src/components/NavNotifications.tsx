import { Link } from "react-router-dom";
import { NavPopper } from "./NavPopper";
import { usePopper } from "../hooks/usePopper";
import { ListItem, MenuList } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

interface NotificationProps {
  notifications: [];
}

interface Notification {
  content: string | undefined;
  createdAt: string | number | Date;
  user: string | undefined;
  read: boolean;
}

export const NavNotifications = ({ notifications }: NotificationProps) => {
  const { setOpen, open } = usePopper();

  return (
    <NavPopper
      setOpen={setOpen}
      open={open}
      button={<NotificationsNoneOutlinedIcon className="notification-icon" />}
    >
      <MenuList
        className="menu-list"
        sx={{
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
                onClick={() => setOpen(false)}
              >
                {notification.user}{" "}
              </Link>{" "}
              {notification.content}{" "}
              <span style={{ marginLeft: "0.5em" }}>
                {formatDistanceToNow(new Date(notification.createdAt))} ago
              </span>
            </ListItem>
          ))
        ) : (
          <ListItem style={{ color: "white" }}>
            No new notifications...
          </ListItem>
        )}
      </MenuList>
    </NavPopper>
  );
};
