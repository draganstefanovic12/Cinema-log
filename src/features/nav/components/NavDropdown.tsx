import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { usePopper } from "@/features/nav/hooks/usePopper";
import { useNavigate } from "react-router-dom";
import { MenuItem, MenuList } from "@mui/material";
import NavPopper from "./NavPopper";

const NavDropdown = () => {
  const { user } = useAuth();
  const { logout } = useLogout();
  const { open, setOpen } = usePopper();
  const navigate = useNavigate();

  return (
    <NavPopper button={user?.username} setOpen={setOpen} open={open}>
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        sx={{
          backgroundColor: "#161b22",
          color: "#cccccc",
        }}
        aria-labelledby="composition-button"
      >
        <MenuItem
          onClick={(e) => {
            navigate(`/user/${user?.username}`);
            setOpen(false);
          }}
        >
          <a href={`/Cinema-log/#/user/${user?.username}`}>Profile</a>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/account");
            setOpen(false);
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setOpen(false);
            logout();
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </NavPopper>
  );
};

export default NavDropdown;
