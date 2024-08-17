"use client";
import {
  Group,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
} from "@mantine/core";
import { IBoardPagin } from "@/types/PageBoardTypes";
import { ReactElement, useState } from "react";
import classes from "./Pagination.module.css";

type PaginationProps = IBoardPagin & {
  data: ReactElement[];
};

export function Paginations({
  data,
  paginShow: show,
  paginJustify: justify,
  paginMarginTop: marginTop,
  ...props
}: PaginationProps) {
  const [page, setPage] = useState(1);
  const pages = data.slice((page - 1) * show, page * show);
  return (
    <>
      {pages}

      <PaginationRoot
        total={Math.ceil(data.length / show)}
        style={{ marginTop: marginTop }}
        styles={{
          root: { borderStyle: "none", marginTop: marginTop },
          control: { borderStyle: "none" },
          dots: { color: "black" },
        }}
        className={classes.root}
        value={page}
        onChange={setPage}
        {...props}
      >
        <Group gap={8} justify={justify}>
          <PaginationPrevious />
          <PaginationItems />
          <PaginationNext />
        </Group>
      </PaginationRoot>
    </>
  );
}
