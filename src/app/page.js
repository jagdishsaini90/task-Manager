"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Dashboard from "@/app/_dashboard";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/loginSlice";
import { MdLogout } from "react-icons/md";
import Button from "@/components/button";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/loader";

const Container = styled.div`
  background-color: #000;
  color: white;
  min-height: 100vh;
  padding: 1rem;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
        router.push("/auth/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    router.push("/auth/login");
  };

  if (!userData) return <Loader />;

  return (
    <Container>
      <Nav>
        <Title>Task Manager</Title>
        <Button text="Logout" icon={<MdLogout />} onClick={handleLogout} />
      </Nav>
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </Container>
  );
}
