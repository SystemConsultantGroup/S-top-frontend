import { ReactNode } from "react";
import { TableTh as DataTableHeaderElement, Group, UnstyledButton } from "@mantine/core";
import classes from "./DataTableHeader.module.css";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

export interface DataTableHeaderProps {
  label: string | ReactNode;
  widthPercentage?: number;
  sort?: boolean;
  selector?: string;
  sortBy?: string;
  order?: string;
  handleSortButton?: (selector?: string) => void;
}

export function DataTableHeader({
  label,
  widthPercentage,
  sort,
  selector,
  sortBy,
  order,
  handleSortButton,
}: DataTableHeaderProps) {
  const selected = selector === sortBy;

  return (
    <DataTableHeaderElement
      style={{
        width: widthPercentage ? `${widthPercentage}%` : "auto",
      }}
      className={classes.element}
      fw={500}
      fz={16}
    >
      <Group gap={0}>
        {label}
        {sort ? (
          <UnstyledButton onClick={() => handleSortButton && handleSortButton(selector)}>
            {selected && order === "asc" ? (
              <IconArrowUp color={selected ? "var(--color-primary)" : "var(--color-onSurface)"} />
            ) : selected && order === "desc" ? (
              <IconArrowDown color={selected ? "var(--color-primary)" : "var(--color-onSurface)"} />
            ) : (
              <IconArrowDown color={selected ? "var(--color-primary)" : "var(--color-onSurface)"} />
            )}
          </UnstyledButton>
        ) : (
          <></>
        )}
      </Group>
    </DataTableHeaderElement>
  );
}
