import { CloseButton, Input, InputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import styles from "./SearchInput.module.css";

interface ISearchHandler {
  value: string;
  handleInput: (event: MouseEvent | ChangeEvent, payload?: unknown) => void;
  handleKeyDown: (event: KeyboardEvent, payload?: unknown) => void;
}

type SearchInputProps = InputProps &
  ISearchHandler & {
    placeholder?: string;
    iconSize?: number;
  };

export function SearchInput({
  value,
  handleInput,
  handleKeyDown,
  placeholder,
  iconSize = 16,
  ...props
}: SearchInputProps) {
  return (
    <>
      <Input
        classNames={{
          input: styles.input,
          section: styles.section,
        }}
        value={value}
        placeholder={placeholder}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rightSectionPointerEvents="all"
        leftSection={<IconSearch size={iconSize} />}
        rightSection={
          <CloseButton
            onClick={(e) => handleInput(e, "CLEAR")}
            style={{ display: value ? undefined : "none" }}
          />
        }
        {...props}
      />
    </>
  );
}
