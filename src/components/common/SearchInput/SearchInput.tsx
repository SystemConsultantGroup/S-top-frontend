import { Input, InputProps } from "@mantine/core";

export function SearchInput({ placeholder, ...props }: InputProps & { placeholder?: string }) {
  return <Input placeholder={placeholder} {...props} />;
}
