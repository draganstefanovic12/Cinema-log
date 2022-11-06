import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { Input, MenuList } from "@mui/material";
import NavPopper from "@/features/nav/components/NavPopper";
import backendApi from "@/features/api/backendApi";

type Curr = {
  current: JSX.Element;
};

const ProfileImageUploadForm = ({ current }: Curr) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const handleClick = () => {
    document.getElementById("hidden")?.click();
  };

  const handleSubmit = () => {
    setOpen(false);
    document.getElementById("submit")?.click();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleDelete = () => {
    setOpen(false);
    backendApi.delete(`/image/delete/${user?._id}`);
  };

  return (
    <NavPopper open={open} setOpen={setOpen} button={current}>
      <form
        style={{ display: "hidden" }}
        method="POST"
        action={`/image/upload/${user?._id}`}
        encType="multipart/form-data"
      >
        <MenuList
          className="img-form-menu"
          sx={{ padding: "0.5em", color: "#cccccc" }}
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
          sx={{ padding: "0.5em", color: "#cccccc" }}
          onClick={handleDelete}
        >
          Remove
        </MenuList>
      </form>
    </NavPopper>
  );
};

export default ProfileImageUploadForm;
