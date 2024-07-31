import { Input, InputProps, InputWrapper } from "@mantine/core";
import { ReactNode } from "react";

type TextInputPropsType = {
  label?: string | ReactNode;
  description?: string | ReactNode;
  error?: string | ReactNode;
  placeholder?: string;
};

export function TextInput({
  label,
  description,
  error,
  placeholder,
  ...props
}: InputProps & TextInputPropsType) {
  return (
    <InputWrapper label={label} description={description} error={error}>
      <Input placeholder={placeholder} {...props} />
    </InputWrapper>
  );
}
