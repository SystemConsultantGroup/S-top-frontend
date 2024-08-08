import { Button, ButtonProps } from "@mantine/core";
import classes from "./SecondaryButton.module.css";

export function SecondaryButton({ label, ...props }: ButtonProps & { label?: string }) {
  return (
    <>
      <Button className={classes.element} {...props}>
        {label}
      </Button>
    </>
  );
}
