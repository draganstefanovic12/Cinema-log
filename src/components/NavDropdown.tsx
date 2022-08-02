import { MenuItem, MenuList } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { usePopper } from "../hooks/usePopper";
import { NavPopper } from "./NavPopper";

export const NavDropdown = () => {
  const { open, setOpen } = usePopper();

  const { logout } = useLogout();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <NavPopper button={user?.username} setOpen={setOpen} open={open}>
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        sx={{
          backgroundColor: "#161b22",
        }}
        aria-labelledby="composition-button"
      >
        <MenuItem
          onClick={(e) => {
            setOpen(false);
            navigate(`/user/${user?.username}`);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={() => setOpen(false)}>My account</MenuItem>
        <MenuItem
          onClick={(e) => {
            setOpen(false);
            logout();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </NavPopper>
  );
};
