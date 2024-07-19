import React, { useState, useEffect } from 'react';
import classes from './RadioButton.module.css';

interface RadioButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <button
      type="button"
      className={`${classes.radioButton} ${isChecked ? classes.checked : ''}`}
      onClick={handleClick}
    ></button>
  );
};
