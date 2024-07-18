import { TableTd as DataTableDataElement } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./DataTableData.module.css";

interface DataTableDataProps {
  children: ReactNode;
}

export function DataTableData({ children }: DataTableDataProps) {
  return (
    <DataTableDataElement fz={16} fw={500} className={classes.element}>
      {children}
    </DataTableDataElement>
  );
}
