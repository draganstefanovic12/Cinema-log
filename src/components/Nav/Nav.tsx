import "./styles/nav.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import NavDropdown from "../NavDropdown";
import NavNotifications from "../NavNotifications";
import { Input, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";

const Nav = () => {
  //Changing the logo to be filled on hover
  const [hover, setHover] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { user, userStats } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e: string) => {
    e === "Enter" && value && navigate(`/search/${value}/multi`);
  };

  return (
    <nav className="nav">
      <Container className="nav-inner">
        <a
          className="home-link"
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          style={{ marginLeft: "1em" }}
          href="/Cinema-log/"
        >
          {hover ? <MovieCreationRoundedIcon /> : <MovieCreationOutlinedIcon />}
        </a>
        <div>
          {user && (
            <Container className="avatar-container">
              <Input
                placeholder="Search..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon
                      className="svg"
                      onClick={() =>
                        value && navigate(`/search/${value}/multi`)
                      }
                    />
                  </InputAdornment>
                }
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => handleClick(e.key)}
              />
              {userStats ? (
                <NavNotifications notifications={userStats.notifications} />
              ) : (
                <NotificationsNoneOutlined className="notification-icon" />
              )}
              <NavDropdown />
            </Container>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
