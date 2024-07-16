import { Group, Pagination, Text } from "@mantine/core";
import classes from "./Pagination.module.css";
import { useState } from "react";

const data = Array(0);
for (let i = 0; i < 127; i++) {
  data.push(i);
}

export function Paginations({ show, ...props }: { show: number }) {
  const [page, setPage] = useState(1);
  const pages = data.slice((page - 1) * show, page * show).map((e) => {
    return (
      <>
        <Text>{e}: test article</Text>
      </>
    );
  });
  return (
    <>
      {pages}

      <Pagination.Root
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
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Group>
      </Pagination.Root>
    </>
  );
}
