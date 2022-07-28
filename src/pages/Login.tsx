import { Button, FormLabel, Input } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import loginBg from "../assets/login-bg.jpg";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, setError, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="form-container"
    >
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
        <Button type="submit" disabled={isLoading!}>
          Log in
        </Button>
        {error && <p style={{ color: "red" }}>{error}!</p>}
      </form>
    </div>
  );
};
