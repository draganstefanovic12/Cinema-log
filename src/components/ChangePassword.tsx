import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";

export const ChangePassword = () => {
  const [error, setError] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
  const { debounce } = useDebounce(oldPassword);
  const { user } = useAuth();

  const handleSubmit = () => {
    fetch(
      `https://media-log.herokuapp.com/checkpassword/${user?.username}/${debounce}/${newPassword}`,
      {
        method: "POST",
        headers: {
          Authorization: `${user?.username} ${user?.token}`,
        },
      }
    ).then((res) => {
      if (res.status === 400) {
        setError(true);
      }
    });
  };

  useEffect(() => {
    const handleCheck = () => {
      if (newPassword !== checkNewPassword) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    };
    handleCheck();
  }, [newPassword, checkNewPassword]);

  return (
    <Container className="pw-cont">
      <Typography sx={{ marginBottom: "1em" }}>Change Password:</Typography>

      <TextField
        type="password"
        error={error}
        label="old password"
        onChange={(e) => {
          setError(false);
          setOldPassword(e.target.value);
        }}
        size="small"
        sx={{ width: "15em", marginBottom: "1em" }}
      />
      <TextField
        type="password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        label="new password"
        size="small"
        sx={{ width: "15em", marginBottom: "1em" }}
      />
      <TextField
        type="password"
        onChange={(e) => {
          setCheckNewPassword(e.target.value);
        }}
        label="repeat new password"
        size="small"
        sx={{ width: "15em", marginBottom: "1em" }}
      />
      <Button
        disabled={passwordMatch}
        className="change-pw-btn"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};
