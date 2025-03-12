"use client";
import React from "react";
import { ButtonWrapper } from "./styles";

const Button = ({
  text,
  onClick,
  icon,
  type = "button",
  variant = "primary",
}) => {
  return (
    <ButtonWrapper type={type} onClick={onClick} variant={variant}>
      {icon}
      {text}
    </ButtonWrapper>
  );
};

export default Button;
