import { Label } from "@mui/icons-material";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";

export const ChangeUsername = () => {
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { debounce } = useDebounce(username);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${username}`)
      .then((res) => res.json())
      .then((final) => {
        if (final.user !== null) {
          setError(true);
        }
      });
  }, [debounce, username]);

  const handleSubmit = async () => {
    localStorage.setItem("user", JSON.stringify({ username: username }));
    await axios.post(
      `http://localhost:5000/user/changeusername/${user?.username}`,
      {
        newUsername: username,
      }
    );
  };
  return (
    <Container className="account-cont">
      <Typography sx={{ marginBottom: "1em" }}>Change username:</Typography>

      <TextField
        size="small"
        error={error}
        variant="outlined"
        onChange={(e) => {
          setError(false);
          setUsername(e.target.value);
          setErrorMessage("");
        }}
      />
      <InputLabel sx={{ color: "red" }}>{errorMessage}</InputLabel>
      <Button
        onClick={() => {
          if (username.length === 0) {
            setError(true);
            setErrorMessage("username can't be empty");
            return;
          }
          handleSubmit();
          window.location.reload();
        }}
        disabled={error}
      >
        Submit
      </Button>
    </Container>
  );
};
