import { Input, InputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "./SearchInput.module.css";

export function SearchInput({
  placeholder,
  iconSize = 16,
  ...props
}: InputProps & { placeholder?: string; iconSize?: number }) {
  return (
    <>
      <Input
        classNames={{
          input: styles.input,
          section: styles.section,
          wrapper: styles.wrapper,
        }}
        placeholder={placeholder}
        leftSection={<IconSearch size={iconSize} />}
        {...props}
      />
    </>
  );
}
