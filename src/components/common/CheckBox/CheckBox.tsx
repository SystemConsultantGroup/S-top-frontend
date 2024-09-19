"use client";
import React, { useState } from "react";
import { Checkbox as MantineCheckbox } from "@mantine/core";
import styles from "./CheckBox.module.css";

interface CheckBoxProps {
  label: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <div className={styles.checkboxContainer} onClick={handleClick}>
      <MantineCheckbox
        checked={checked}
        onChange={handleClick}
        size="sm"
        radius={"sm"}
        color="#36618E"
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
};
