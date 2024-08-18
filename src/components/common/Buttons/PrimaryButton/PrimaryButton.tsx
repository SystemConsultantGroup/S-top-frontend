import { Button, ButtonProps } from "@mantine/core";
import classNames from "classnames";
import classes from "./PrimaryButton.module.css";

export function PrimaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button className={classNames(classes.element, className)} {...props}>
      {children}
    </Button>
  );
}
