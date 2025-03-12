"use client";
import React from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: #e0e0e0;

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const SelectWrapper = styled.select`
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

const Select = ({ label, id, children, ...props }) => {
  return (
    <SelectContainer>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <SelectWrapper id={id} {...props}>
        {children}
      </SelectWrapper>
    </SelectContainer>
  );
};

export default Select;
