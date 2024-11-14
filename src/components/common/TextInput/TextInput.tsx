import { Input, InputProps, InputWrapper } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./TextInput.module.css";

interface IWrapperStyle {
  description?: string;
  error?: string;
  label?: string;
  root?: string;
}

type TextInputPropsType = {
  label?: string | ReactNode;
  description?: string | ReactNode;
  error?: string | ReactNode;
  placeholder?: string;
  wrapperClasses?: IWrapperStyle;
  initialValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({
  label,
  description,
  error,
  placeholder,
  wrapperClasses,
  initialValue,
  onChange,
  ...props
}: InputProps & TextInputPropsType) {
  return (
    <InputWrapper classNames={wrapperClasses} label={label} description={description} error={error}>
      <Input placeholder={placeholder} onChange={onChange} {...props} value={initialValue} />
    </InputWrapper>
  );
}
