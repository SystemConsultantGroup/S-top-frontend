import React, { useEffect, useState } from "react";
import classes from "./FilterChip.module.css";
import { IconRotateClockwise } from "@tabler/icons-react";

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

  if (isReset) {
    return (
      <div className={`${classes.filterChip} ${classes.resetChip}`}>
        <>
          <IconRotateClockwise stroke={1.8} color={"#BA1A1A"} size={16} />
          <span className={classes.resetLabel}>{label}</span>
        </>
      </div>
    );
  }

  return (
    <div className={classes.filterChip} style={{ backgroundColor: bgColor }}>
      <span className={classes.label}>{label}</span>
      <span className={classes.close} onClick={onRemove}>
        X
      </span>
    </div>
  );
}
