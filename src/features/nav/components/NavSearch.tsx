import { Input, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavSearch = () => {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (e: string) => {
    e === "Enter" && value && navigate(`/search/${value}/multi/1`);
  };

  return (
    <Input
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon
            className="svg"
            onClick={() => value && navigate(`/search/${value}/multi/1`)}
          />
        </InputAdornment>
      }
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => handleClick(e.key)}
    />
  );
};

export default NavSearch;
