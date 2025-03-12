import React from "react";
import { StyledLabel } from "./styles";

const Label = ({ id, label }) => {
  if (!label) return null;
  return <StyledLabel htmlFor={id}>{label}</StyledLabel>;
};

export default Label;
