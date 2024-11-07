"use client";
import React, { useState } from "react";
import { Checkbox as MantineCheckbox } from "@mantine/core";
import styles from "./CheckBox.module.css";

interface CheckBoxProps {
  label: string;
  defaultValue?: boolean;
  onClick?: (value: boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label, defaultValue = false, onClick }) => {
  const [checked, setChecked] = useState(defaultValue);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked); // 상태 변경

    // onClick 콜백이 전달된 경우 호출
    if (onClick) {
      onClick(newChecked);
    }
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
