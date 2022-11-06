import { Link } from "react-router-dom";
import { usePopper } from "@/features/nav/hooks/usePopper";
import { Notification } from "../types";
import { ListItem, MenuList } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { updateNotificationsToRead } from "@/features/api/backendApi";
import { useMutation, useQueryClient } from "react-query";
import NavPopper from "./NavPopper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

type NotificationProps = {
  notifications: Notification[];
};

const NavNotifications = ({ notifications }: NotificationProps) => {
  const queryClient = useQueryClient();
  const { setOpen, open } = usePopper();

  const mutateNotifications = useMutation(updateNotificationsToRead, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
    },
  });

  const checkForUnreadNotifications = notifications.filter((notification) => !notification.read);

  const button =
    checkForUnreadNotifications.length > 0 ? (
      <NotificationsIcon className="notification-icon" />
    ) : (
      <NotificationsNoneOutlinedIcon className="notification-icon" />
    );

  return (
    <div onClick={() => mutateNotifications.mutate()}>
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
