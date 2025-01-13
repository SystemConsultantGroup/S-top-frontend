"use client";

import React, { ReactNode } from "react";
import { TableTr as DataTableRowElement } from "@mantine/core";
import classes from "./DataTableRow.module.css";

export interface DataTableRowProps {
  children: ReactNode;
  onClick?: () => void;
}

export function DataTableRow({ children, onClick }: DataTableRowProps) {
  return (
    <DataTableRowElement
      onClick={onClick}
      className={onClick ? classes.container : classes.containerNoPointer}
    >
      {children}
    </DataTableRowElement>
  );
}
