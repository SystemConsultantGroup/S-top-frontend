import { TableTd as DataTableDataElement } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./DataTableData.module.css";

interface DataTableDataProps {
  maxWidth?: string;
  children: ReactNode;
}

export function DataTableData({ maxWidth, children }: DataTableDataProps) {
  return (
    <DataTableDataElement fz={16} fw={500} className={classes.element}>
      <p style={{ maxWidth: maxWidth }} className={classes.block}>
        {children}
      </p>
    </DataTableDataElement>
  );
}
