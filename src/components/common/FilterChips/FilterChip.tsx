import React, { useEffect, useState } from "react";
import ResetIcon from "./ResetIcon";
import classes from "./FilterChip.module.css";

type FilterChipProps = {
  label: string;
  onRemove: () => void;
  isReset?: boolean;
};

const randomBackgroundColor = () => {
  const colors = ["#DFE2EB", "#D1E4FF", "#F3DAFF"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function FilterChip({ label, onRemove, isReset = false }: FilterChipProps) {
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    if (!isReset) {
      setBgColor(randomBackgroundColor());
    }
  }, [isReset]);

  return (
    <div className={classes.filterChip} style={{ backgroundColor: isReset ? "#DFE2EB" : bgColor }}>
      {!isReset && <span className={classes.label}>{label}</span>}
      {!isReset && (
        <span className={classes.close} onClick={onRemove}>
          X
        </span>
      )}
      {isReset && (
        <>
          <ResetIcon />
          <span className={classes.resetLabel}>{label}</span>
        </>
      )}
    </div>
  );
}
