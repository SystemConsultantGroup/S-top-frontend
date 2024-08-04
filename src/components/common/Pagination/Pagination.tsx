"use client";
import {
  Group,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
} from "@mantine/core";
import classes from "./Pagination.module.css";
import { useState } from "react";

export function Paginations({ show, data, ...props }: { show: number; data: Array<Element> }) {
  const [page, setPage] = useState(1);
  const pages = data.slice((page - 1) * show, page * show);
  return (
    <>
      {pages}

      <PaginationRoot
        total={Math.ceil(data.length / show)}
        styles={{
          root: { borderStyle: "none" },
          control: { borderStyle: "none" },
          dots: { color: "black" },
        }}
        className={classes.root}
        value={page}
        onChange={setPage}
        {...props}
      >
        <Group gap={8} justify="center">
          <PaginationPrevious />
          <PaginationItems />
          <PaginationNext />
        </Group>
      </PaginationRoot>
    </>
  );
}
