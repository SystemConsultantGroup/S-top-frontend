import { Input, InputProps } from "@mantine/core";
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
    <Input.Wrapper label={label} description={description} error={error}>
      <Input placeholder={placeholder} {...props} />
    </Input.Wrapper>
  );
}
