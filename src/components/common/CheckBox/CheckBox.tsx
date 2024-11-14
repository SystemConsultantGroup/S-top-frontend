"use client";
import React, { useState } from "react";
import { Checkbox as MantineCheckbox } from "@mantine/core";
import styles from "./CheckBox.module.css";

interface CheckBoxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setChecked] = useState(checked);

  const handleClick = () => {
    setChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <div className={styles.checkboxContainer} onClick={handleClick}>
      <MantineCheckbox
        checked={isChecked}
        onChange={handleClick}
        size="sm"
        radius={"sm"}
        color="#36618E"
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
};
