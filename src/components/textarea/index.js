"use client";
import React from "react";
import styled from "styled-components";

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: #e0e0e0;

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const TextareaWrapper = styled.textarea`
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

const Textarea = ({ label, id, ...props }) => {
  return (
    <TextareaContainer>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <TextareaWrapper id={id} {...props} />
    </TextareaContainer>
  );
};

export default Textarea;
