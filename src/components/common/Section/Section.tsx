import { Box, BoxProps } from "@mantine/core";
import classes from "./Section.module.css";

interface Props extends BoxProps {
  children: React.ReactNode;
}

export function Section({ children, ...props }: Props) {
  return (
    <Box component="section" className={classes.wrapper} {...props}>
      {children}
    </Box>
  );
}
