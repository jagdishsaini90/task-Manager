"use client";
import React from "react";
import Label from "../label";
import { TextareaContainer, TextareaWrapper } from "./styles";

const Textarea = ({ label, id, ...props }) => {
  return (
    <TextareaContainer>
      <Label htmlFor={id} label={label} />
      <TextareaWrapper id={id} {...props} />
    </TextareaContainer>
  );
};

export default Textarea;
