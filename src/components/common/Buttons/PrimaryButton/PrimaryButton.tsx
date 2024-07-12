import { Button, ButtonProps } from "@mantine/core";
import classes from "./PrimaryButton.module.css";

export function PrimaryButton({ label, ...props }: ButtonProps & { label?: string }) {
  return (
    <>
      <Button className={classes.element} {...props}>
        {label}
      </Button>
    </>
  );
}
