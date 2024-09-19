import { TableTd as DataTableDataElement } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./DataTableData.module.css";

interface DataTableDataProps {
  maxWidth?: string;
  text?: boolean;
  children: ReactNode;
}

export function DataTableData({ maxWidth, text = true, children }: DataTableDataProps) {
  return (
    <DataTableDataElement fz={16} fw={500} className={classes.element}>
      {text ? (
        <p style={{ maxWidth: maxWidth }} className={classes.block}>
          {children}
        </p>
      ) : (
        children
      )}
    </DataTableDataElement>
  );
}
