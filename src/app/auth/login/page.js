"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, ErrorText, Title } from "./styles";
import Button from "@/components/button";
import Input from "@/components/input";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, error, user } = useSelector((state) => state.login);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    }
  }, [isAuthenticated, router, user]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setLocalError("Username and password are required.");
      return;
    }

    setLocalError("");
    dispatch(login({ username, password }));
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {(localError || error) && (
            <ErrorText>{localError || error}</ErrorText>
          )}
          <Button text="Login" type="submit" />
        </form>
      </Card>
    </Container>
  );
}
