import { Input, MenuList } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavPopper } from "./NavPopper";

type Curr = {
  current: JSX.Element;
  setImgSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ImageUploadForm = ({ current, setImgSrc }: Curr) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, userStats } = useAuth();

  const handleClick = () => {
    document.getElementById("hidden")?.click();
  };

  const handleSubmit = () => {
    setOpen(false);
    document.getElementById("submit")?.click();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDelete = () => {
    setImgSrc("");
    setOpen(false);
    axios.delete(
      `https://media-log.herokuapp.com/image/delete/${userStats?.data.user._id}`,
      {
        headers: {
          Authorization: `${user?.username} ${user?.token}`,
        },
      }
    );
  };

  return (
    <NavPopper open={open} setOpen={setOpen} button={current}>
      <form
        style={{ display: "hidden" }}
        method="POST"
        action={`https://media-log.herokuapp.com/image/upload/${userStats?.data.user._id}`}
        encType="multipart/form-data"
      >
        <MenuList
          className="img-form-menu"
          sx={{ padding: "0.5em" }}
          onClick={handleClick}
        >
          Upload file
          <input
            onChange={handleSubmit}
            name="fileupload"
            accept="image/*"
            style={{ opacity: "0", position: "absolute" }}
            id="hidden"
            type="file"
          />
        </MenuList>
        <Input
          sx={{ display: "none" }}
          type="submit"
          id="submit"
          name="fileupload"
          onSubmit={() => window.location.reload()}
        />
        <MenuList
          className="img-form-menu"
          sx={{ padding: "0.5em" }}
          onClick={handleDelete}
        >
          Remove
        </MenuList>
      </form>
    </NavPopper>
  );
};
