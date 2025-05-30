import { Button, ButtonProps } from "@mantine/core";
import classNames from "classnames";
import classes from "./DangerButton.module.css";

export function DangerButton({
  children,
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <Button className={classNames(classes.element, className)} {...props}>
        {children}
      </Button>
    </>
  );
}
