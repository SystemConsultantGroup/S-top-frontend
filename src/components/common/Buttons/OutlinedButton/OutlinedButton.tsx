import { Button, ButtonProps } from "@mantine/core";
import classes from "./OutlinedButton.module.css";

export function OutlinedButton({ label, ...props }: ButtonProps & { label?: string }) {
  return (
    <>
      <Button className={classes.element} {...props}>
        {label}
      </Button>
    </>
  );
}
