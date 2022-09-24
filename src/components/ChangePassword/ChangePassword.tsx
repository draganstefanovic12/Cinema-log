import "./styles/changepassword.css";
import { useAuth } from "../../context/AuthContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

const ChangePassword = () => {
  const [error, setError] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");
  const [change, setChange] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
  const { debounce } = useDebounce(oldPassword);
  const { user } = useAuth();

  const handleSubmit = () => {
    fetch(`/user/checkpassword/${user?.username}/${debounce}/${newPassword}`, {
      method: "POST",
      headers: {
        Authorization: `${user?.username} ${user?.token}`,
      },
    }).then((res) => {
      if (res.status === 400) {
        setError(true);
      } else {
        setChange("done");
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
    <Container className="pw-cont" sx={{ display: "flex", width: "17em" }}>
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
        error={passwordMatch}
        onChange={(e) => {
          setCheckNewPassword(e.target.value);
        }}
        label="repeat new password"
        size="small"
        sx={{ width: "15em", marginBottom: "1em" }}
      />
      <Button
        color={change ? "success" : "primary"}
        disabled={passwordMatch}
        className="change-pw-btn"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {change === "done" && (
        <Typography sx={{ whiteSpace: "nowrap" }}>
          Password succesfully changed.
        </Typography>
      )}
    </Container>
  );
};

export default ChangePassword;
