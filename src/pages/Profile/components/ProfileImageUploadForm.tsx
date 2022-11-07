import { useState } from "react";
import { MenuList } from "@mui/material";
import { removeAvatar, uploadAvatar } from "@/features/api/backendApi";
import { useQueryClient, useMutation } from "react-query";
import NavPopper from "@/features/nav/components/NavPopper";

type Curr = {
  current: JSX.Element;
};

const ProfileImageUploadForm = ({ current }: Curr) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const mutateAvatar = useMutation(uploadAvatar, {
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries("currentUser");
    },
  });

  const deleteAvatar = useMutation(removeAvatar, {
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries("currentUser");
    },
  });

  return (
    <NavPopper open={open} setOpen={setOpen} button={current}>
      <div>
        <MenuList className="img-form-menu" sx={{ padding: "0.5em", color: "#cccccc" }}>
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
        <MenuList
          className="img-form-menu"
          sx={{ padding: "0.5em", color: "#cccccc" }}
          onClick={() => deleteAvatar.mutate()}
        >
          Remove
        </MenuList>
      </div>
    </NavPopper>
  );
};

export default ProfileImageUploadForm;
