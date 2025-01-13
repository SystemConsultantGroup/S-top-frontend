import { Flex } from "@mantine/core";
import classes from "./DummyRow.module.css";

export function DummyRow() {
  return (
    <Flex
      gap={0}
      align="center"
      justify="flex-start"
      direction="row"
      wrap="nowrap"
      className={classes.row}
    ></Flex>
  );
}
