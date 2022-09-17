import { Link } from "react-router-dom";
import { ListItem, MenuList } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "../../features/axios/incerceptor";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useAuth } from "../../context/AuthContext";
import NavPopper from "../NavPopper";
import { usePopper } from "../../hooks/usePopper";
import { Notification } from "../../types/types";

type NotificationProps = {
  notifications: Notification[];
};

const NavNotifications = ({ notifications }: NotificationProps) => {
  const [read, setRead] = useState<boolean>(true);
  const { setOpen, open } = usePopper();
  const { user, userStats } = useAuth();

  const handleClick = async () => {
    setRead(true);
    await axios.post(
      `https://media-log.herokuapp.com/user/notifications/${userStats?.username}`
    );
  };

  //implement notifications with socket.io
  useEffect(() => {
    notifications.map(
      (notification: Notification) =>
        notification.read === false && read === true && setRead(false)
    );
  }, []);

  return (
    <div onClick={handleClick}>
      <NavPopper
        setOpen={setOpen}
        open={open}
        button={
          read ? (
            <NotificationsNoneOutlinedIcon className="notification-icon" />
          ) : (
            <NotificationsIcon className="notification-icon" />
          )
        }
      >
        <MenuList className="menu-list">
          {notifications.length > 0 ? (
            notifications.slice(0, 10).map((notification: Notification) => (
              <ListItem key={notification._id} style={{ whiteSpace: "nowrap" }}>
                <Link
                  style={{ marginRight: "0.2em", display: "" }}
                  to={`/user/${notification.user}`}
                  onClick={() => setOpen(false)}
                >
                  {notification.user}{" "}
                </Link>{" "}
                {notification.content}
                {notification.content2 && notification.content2}
                {notification.content4 && (
                  <Link
                    style={{ marginLeft: "0.3em" }}
                    onClick={() => setOpen(false)}
                    to={`/${notification.type}/${notification.id}`}
                  >
                    {notification.content4}
                  </Link>
                )}
                {notification.content3 && (
                  <Link
                    style={{ marginLeft: "0.3em" }}
                    onClick={() => setOpen(false)}
                    to={`/list/${notification.content3}`}
                  >
                    {notification.content3}
                  </Link>
                )}
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
    </div>
  );
};

export default NavNotifications;
