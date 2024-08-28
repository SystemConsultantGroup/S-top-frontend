import { Input, InputProps, InputWrapper } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./TextInput.module.css";

type TextInputPropsType = {
  label?: string | ReactNode;
  description?: string | ReactNode;
  error?: string | ReactNode;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({
  label,
  description,
  error,
  placeholder,
  onChange,
  ...props
}: InputProps & TextInputPropsType) {
  return (
    <InputWrapper label={label} description={description} error={error}>
      <Input
        classNames={{
          input: styles.input,
        }}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </InputWrapper>
  );
}
