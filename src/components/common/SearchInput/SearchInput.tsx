import { Input, InputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "./SearchInput.module.css";

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
        classNames={{
          input: styles.input,
          section: styles.section,
        }}
        placeholder={placeholder}
        leftSection={<IconSearch size={iconSize} />}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
