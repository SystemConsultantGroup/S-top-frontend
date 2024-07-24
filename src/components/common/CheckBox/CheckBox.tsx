import React, { useState } from "react";
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
      <div className={`${styles.checkbox} ${checked ? styles.checked : styles.unchecked}`}>
        {checked ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#36618E" />
            <path
              d="M17.3337 8L10.0003 15.3333L6.66699 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#D1E4FF" />
            <path
              d="M17.3337 8L10.0003 15.3333L6.66699 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
