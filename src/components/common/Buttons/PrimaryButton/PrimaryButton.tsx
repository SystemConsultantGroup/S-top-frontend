import { Button, ButtonProps } from "@mantine/core";
import classNames from "classnames";
import classes from "./PrimaryButton.module.css";

export function PrimaryButton({ label, className, ...props }: ButtonProps & { label?: string }) {
  return (
    <Button className={classNames(classes.element, className)} {...props}>
      {label}
    </Button>
  );
}
