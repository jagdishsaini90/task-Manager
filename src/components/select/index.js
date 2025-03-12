"use client";
import React from "react";
import Label from "../label";
import { SelectContainer, SelectWrapper } from "./styles";

const Select = ({ label, id, children, ...props }) => {
  return (
    <SelectContainer>
      <Label htmlFor={id} label={label} />
      <SelectWrapper id={id} {...props}>
        {children}
      </SelectWrapper>
    </SelectContainer>
  );
};

export default Select;
