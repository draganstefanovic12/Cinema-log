import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { checkPasswordChange } from "@/features/api/backendApi";

const ChangePassword = () => {
  const [error, setError] = useState<boolean>(false);
  const [change, setChange] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleChangePassword = async () => {
    const passwordStatus = await checkPasswordChange(oldPassword, newPassword).catch((err) => {
      err && setError(true);
    });
    passwordStatus && setChange("done");
  };

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  return (
    <Container className="pw-cont">
      <Typography className="pw-cont-text">Change Password:</Typography>
      <div className="pw-cont-textfields">
        <TextField
          type="password"
          error={error}
          label="old password"
          onChange={handleOldPassword}
          size="small"
        />
        <TextField type="password" onChange={handleNewPassword} label="new password" size="small" />
        <TextField type="password" error={error} label="repeat new password" size="small" />
      </div>
      <Button
        color={change ? "success" : "primary"}
        disabled={error}
        className="change-pw-btn"
        onClick={handleChangePassword}
      >
        Submit
      </Button>
      {change === "done" && <Typography className="success">Succesfully changed.</Typography>}
    </Container>
  );
};

export default ChangePassword;
