import { Link } from "react-router-dom";
import { usePopper } from "@/features/nav/hooks/usePopper";
import { Notification } from "../types";
import { ListItem, MenuList } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { updateNotificationsToRead } from "@/features/api/backendApi";
import NavPopper from "./NavPopper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

type NotificationProps = {
  notifications: Notification[];
};

const NavNotifications = ({ notifications }: NotificationProps) => {
  const [read, setRead] = useState<boolean>(true);
  const { setOpen, open } = usePopper();

  const handleReadNotification = async () => {
    setRead(true);
    await updateNotificationsToRead();
  };

  useEffect(() => {
    notifications.map(
      (notification: Notification) => notification.read === false && read === true && setRead(false)
    );
  }, [notifications, read]);

  const button = read ? (
    <NotificationsNoneOutlinedIcon className="notification-icon" />
  ) : (
    <NotificationsIcon className="notification-icon" />
  );

  return (
    <div onClick={handleReadNotification}>
      <NavPopper setOpen={setOpen} open={open} button={button}>
        <MenuList className="menu-list">
          {notifications && notifications.length > 0 ? (
            notifications
              .slice(0, 10)
              .map(
                ({
                  _id,
                  user,
                  content,
                  content2,
                  content3,
                  content4,
                  type,
                  createdAt,
                }: Notification) => (
                  <ListItem key={_id} className="menu-list-item">
                    <Link
                      className="menu-list-item-link"
                      to={`/user/${user}`}
                      onClick={() => setOpen(false)}
                    >
                      {user}
                    </Link>
                    {content}
                    {content2 && content2}
                    {content4 && (
                      <Link onClick={() => setOpen(false)} to={`/${type}/${_id}`}>
                        {content4}
                      </Link>
                    )}
                    {content3 && (
                      <Link onClick={() => setOpen(false)} to={`/list/${content3}`}>
                        {content3}
                      </Link>
                    )}
                    <span className="menu-list-item-link-date">
                      {formatDistanceToNow(new Date(createdAt))} ago
                    </span>
                  </ListItem>
                )
              )
          ) : (
            <ListItem>No new notifications...</ListItem>
          )}
        </MenuList>
      </NavPopper>
    </div>
  );
};

export default NavNotifications;
