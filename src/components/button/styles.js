import styled, { css } from "styled-components";

export const ButtonWrapper = styled.button`
  width: fit-content;
  max-width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  white-space: nowrap;
  transition: background 0.3s ease;
  flex-wrap: wrap;

  ${({ variant }) =>
    variant === "delete"
      ? css`
          background-color: #ff4d4f;
          color: white;

          &:hover {
            background-color: #d9363e;
          }
        `
      : css`
          background-color: #0070f3;
          color: white;

          &:hover {
            background-color: #005ac1;
          }
        `}

  @media (max-width: 600px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.7rem;
    margin: 0.25rem;
    gap: 0.4rem;
  }
`;
