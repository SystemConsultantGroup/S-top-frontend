import { Button, ButtonProps } from "@mantine/core";
import classes from "./DangerButton.module.css";

export function DangerButton({ label, ...props }: ButtonProps & { label?: string }) {
  return (
    <>
      <Button className={classes.element} {...props}>
        {label}
      </Button>
    </>
  );
}
