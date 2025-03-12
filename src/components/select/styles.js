import styled from "styled-components";

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const SelectWrapper = styled.select`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: none;
  background: #2a2a2a;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #0070f3;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    padding: 0.55rem 0.7rem;
  }
`;
