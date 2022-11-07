import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { Input, MenuList } from "@mui/material";
import { useQueryClient, useMutation } from "react-query";
import NavPopper from "@/features/nav/components/NavPopper";
import backendApi, { uploadAvatar } from "@/features/api/backendApi";

type Curr = {
  current: JSX.Element;
};

const ProfileImageUploadForm = ({ current }: Curr) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const handleClick = () => {
    document.getElementById("hidden")?.click();
  };

  const handleSubmit = async (file: File) => {
    setOpen(false);
    await uploadAvatar(file);
  };

  const mutateAvatar = useMutation(handleSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
    },
  });

  const handleDelete = () => {
    setOpen(false);
    backendApi.delete(`/image/delete/${user?._id}`);
  };

  return (
    <NavPopper open={open} setOpen={setOpen} button={current}>
      <>
        <MenuList
          className="img-form-menu"
          sx={{ padding: "0.5em", color: "#cccccc" }}
          onClick={handleClick}
        >
          Upload file
          <input
            name="fileupload"
            accept="image/*"
            type="file"
            onChange={(e) => {
              e.currentTarget.files && mutateAvatar.mutate(e.currentTarget.files[0]);
            }}
          />
        </MenuList>
        <Input sx={{ display: "none" }} type="submit" id="submit" name="fileupload" />
        <MenuList
          className="img-form-menu"
          sx={{ padding: "0.5em", color: "#cccccc" }}
          onClick={handleDelete}
        >
          Remove
        </MenuList>
      </>
    </NavPopper>
  );
};

export default ProfileImageUploadForm;
