import { useAuth } from "../context/AuthContext";
import { Container } from "@mui/system";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";

export const ChangeUsername = () => {
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { debounce } = useDebounce(username);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`https://media-log.herokuapp.com/user/${username}`)
      .then((res) => res.json())
      .then((final) => {
        if (final.user !== null) {
          setError(true);
        }
      });
  }, [debounce]);

  const handleSubmit = async () => {
    localStorage.setItem("user", JSON.stringify({ username: username }));
    await axios.post(
      `https://media-log.herokuapp.com/user/changeusername/${user?.username}`,
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
