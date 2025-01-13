import classes from "./CardBadge.module.css";

interface CardBadgeProps {
  label: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

export function CardBadge({ label, width, height, backgroundColor, color }: CardBadgeProps) {
  return (
    <div
      className={classes.container}
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
    >
      <div className={classes.element} style={{ color: color }}>
        {label}
      </div>
    </div>
  );
}
