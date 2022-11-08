import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { Container } from "@mui/system";
import NavSearch from "./components/NavSearch";
import NavDropdown from "./components/NavDropdown";
import NavNotifications from "./components/NavNotifications";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";

const Nav = () => {
  //Changing the logo to be filled on hover
  const [hover, setHover] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <nav className="nav">
      <Container className="nav-inner">
        <Link
          className="home-link"
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          to="/"
        >
          {hover ? <MovieCreationRoundedIcon /> : <MovieCreationOutlinedIcon />}
        </Link>
        <div className="nav-inner-user">
          {user && (
            <Container className="avatar-container">
              <NavSearch />
              {user && <NavNotifications notifications={user.notifications} />}
              {!user && <NotificationsNoneOutlined className="notification-icon" />}
              <NavDropdown />
            </Container>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
