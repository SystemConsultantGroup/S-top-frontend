import { Input, InputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function SearchInput({
  placeholder,
  iconSize = 16,
  onChange,
  ...props
}: InputProps & {
  placeholder?: string;
  iconSize?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <Input
        placeholder={placeholder}
        leftSection={<IconSearch size={iconSize} />}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
