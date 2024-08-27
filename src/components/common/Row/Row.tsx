import { Box, BoxProps, Group, Text } from "@mantine/core";
import classes from "./Row.module.css";

export interface RowProps extends BoxProps {
  field?: string; // 필드 이름
  children: React.ReactNode;
  fieldSize?: "sm" | "md" | "lg" | "xl" | number; // 필드 부분이 차지하는 길이
  flexStart?: boolean;
}

export function Row({
  field = "",
  fieldSize = "md",
  children,
  flexStart = false,
  ...props
}: RowProps) {
  return (
    <Box className={classes.wrapper} {...props}>
      <Group gap={0} wrap="nowrap" align={flexStart ? "flex-start" : undefined}>
        <Text
          style={{
            minWidth:
              fieldSize === "sm"
                ? 60
                : fieldSize === "md"
                  ? 100
                  : fieldSize === "lg"
                    ? 200
                    : fieldSize === "xl"
                      ? 300
                      : fieldSize,
          }}
          fz={16}
        >
          {field}
        </Text>
        {children}
      </Group>
    </Box>
  );
}
