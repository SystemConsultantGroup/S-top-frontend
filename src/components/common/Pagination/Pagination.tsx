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

export function Paginations({
  data,
  count,
  pinned = [],
  ...props
}: {
  pinned?: Array<Element>;
  data: Array<Element>;
  count: number;
}) {
  const count2 = count - pinned.length;
  const [page, setPage] = useState(1);
  const pages = pinned.concat(data.slice((page - 1) * count2, page * count2));
  return (
    <>
      {pages}

      <PaginationRoot
        total={Math.ceil(data.length / count2)}
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
