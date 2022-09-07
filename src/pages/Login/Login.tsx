import "./styles/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Button, FormLabel, Input, Typography } from "@mui/material";
import loginBg from "../../assets/login-bg.jpg";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, setError, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleGuest = async () => {
    await login("guest", "1200");
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="form-container"
    >
      <div className="landing-font">
        <Typography className="big-login-text" variant="h2">
          Welcome back
        </Typography>
        <div style={{ display: "flex" }}>
          <Typography className="welcome-back" variant="subtitle1">
            Don't have an account?
          </Typography>
          <Link className="link" to="/register">
            Sign Up
          </Link>
        </div>
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <FormLabel>Username</FormLabel>
        <Input
          className="inpt"
          type="username"
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
        />
        <FormLabel>Password</FormLabel>
        <Input
          className="inpt"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
        />
        <div
          className="btn-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <Button type="submit" disabled={isLoading!}>
            Log in
          </Button>
          <Button onClick={handleGuest} style={{ width: "13rem" }}>
            Continue as guest
          </Button>
        </div>
        {error && <p style={{ color: "red" }}>{error}!</p>}
      </form>
    </div>
  );
};
