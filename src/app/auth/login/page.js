"use client";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  padding: 1rem;
`;

const Card = styled.div`
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 360px;
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 1rem;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: 2px solid #0070f3;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #005dc1;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, error, user } = useSelector((state) => state.login);

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  if (isAuthenticated) {
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/");
    return null;
  }

  return (
    <Container>
      <Card>
        <Title>Login</Title>
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
        {error && <ErrorText>{error}</ErrorText>}
        <Button onClick={handleLogin}>Login</Button>
      </Card>
    </Container>
  );
}
