import { Input, InputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function SearchInput({
  placeholder,
  iconSize = 16,
  ...props
}: InputProps & { placeholder?: string; iconSize?: number }) {
  return (
    <>
      <Input placeholder={placeholder} leftSection={<IconSearch size={iconSize} />} {...props} />
    </>
  );
}
