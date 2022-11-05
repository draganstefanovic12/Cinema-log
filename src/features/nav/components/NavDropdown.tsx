import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/hooks/useLogout";
import { usePopper } from "@/hooks/usePopper";
import { useNavigate } from "react-router-dom";
import { MenuItem, MenuList } from "@mui/material";
import NavPopper from "./NavPopper";

const NavDropdown = () => {
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
          <a style={{ color: "#cccccc" }} href={`/Cinema-log/#/user/${user?.username}`}>
            Profile
          </a>
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
