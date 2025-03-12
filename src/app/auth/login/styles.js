import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  padding: 1rem;
`;

export const Card = styled.div`
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 360px;
  color: #fff;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

export const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;
