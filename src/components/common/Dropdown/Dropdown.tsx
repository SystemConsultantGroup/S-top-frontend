import React, { useState } from "react";
import { Button, Menu } from "@mantine/core";
import classes from "./Dropdown.module.css";

interface DropdownProps {
  options: string[];
  placeholder: string;
}

export function Dropdown({ options, placeholder }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Menu>
      <Menu.Target>
        <Button className={classes.dropdownToggle}>{selectedOption || placeholder}</Button>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((option) => (
          <Menu.Item
            key={option}
            className={classes.dropdownItem}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
