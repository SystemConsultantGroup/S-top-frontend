import { Button, ButtonProps } from "@mantine/core";
import classNames from "classnames";
import classes from "./SecondaryButton.module.css";

export function SecondaryButton({
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
