import { ReactNode } from "react";
import classes from "./CardGridContainer.module.css";

interface Props {
  children: ReactNode;
}

export const CardGridContainer = ({ children }: Props) => {
  return <div className={classes.grid}>{children}</div>;
};
