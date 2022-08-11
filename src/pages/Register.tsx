import { Button, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import bg from "../assets/registration.jpg";
import { Container } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { register, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(username, password);
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="form-container">
        <Container className="registration-cont">
          <div className="landing-form">
            <Typography variant="h5">Welcome to</Typography>
            <Typography className="site-name" variant="h2">
              Media List
            </Typography>
            <Typography variant="h6">
              Register now and recommend media to other users, create custom
              lists, follow other users, add media to watchlist and much more...
            </Typography>
            <Typography
              variant="h6"
              sx={{ marginTop: "1rem", display: "flex" }}
            >
              Created by Dragan Stefanovic
              <GitHubIcon
                className="svg"
                onClick={() =>
                  window.open("https://github.com/draganstefanovic12")
                }
              />
            </Typography>
          </div>
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              className="inpt"
              type="text"
              name="username"
            />
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className="inpt"
              type="password"
              name="password"
            />
            <Button type="submit">Register</Button>
            {error && <p style={{ color: "red" }}>{error}!</p>}
          </form>
        </Container>
      </div>
    </div>
  );
};
