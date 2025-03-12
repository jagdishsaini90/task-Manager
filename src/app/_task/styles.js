import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  color: #fff;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 600px) {
    padding: 1rem;
    max-height: 70%;
    overflow-y: auto;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ErrorText = styled.p`
  color: #ff4d4f;
  text-align: center;
  margin-top: -0.5rem;
`;
