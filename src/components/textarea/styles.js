import styled from "styled-components";

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

export const TextareaWrapper = styled.textarea`
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  background: #2a2a2a;
  color: white;
  font-size: 1rem;
  resize: vertical;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: 2px solid #0070f3;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    padding: 0.5rem 0.75rem;
  }
`;
