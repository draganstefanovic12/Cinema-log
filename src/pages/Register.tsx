import { Button, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { register, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(username, password);
  };

  return (
    <div className="form-container">
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
    </div>
  );
};
