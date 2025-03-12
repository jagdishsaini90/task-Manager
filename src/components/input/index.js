"use client";
import React from "react";
import { InputContainer, InputWrapper } from "./styles";
import Label from "../label";

const Input = ({ label, id, ...props }) => {
  return (
    <InputContainer>
      <Label htmlFor={id} label={label} />
      <InputWrapper id={id} {...props} />
    </InputContainer>
  );
};

export default Input;
