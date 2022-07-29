import { Button, Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { Container } from "@mui/system";
import { NavDropdown } from "./NavDropdown";

export const Nav: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Container className="nav-inner">
        <Link style={{ marginLeft: "1em" }} to="/">
          <MovieCreationOutlinedIcon />
        </Link>
        <div>
          <Link to={`/search/${value}`}></Link>
          {!user && (
            <Button onClick={() => navigate("/register")}>Register</Button>
          )}
          {user && (
            <Container className="avatar-container">
              <Input
                placeholder="Search..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon
                      onClick={() => navigate(`/search/${value}`)}
                    />
                  </InputAdornment>
                }
                onChange={(e) => setValue(e.target.value)}
              />
              <NavDropdown />
            </Container>
          )}
        </div>
      </Container>
    </nav>
  );
};
