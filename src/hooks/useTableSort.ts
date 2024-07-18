import { useState, useCallback } from "react";

export function useTableSort() {
  const [sortBy, setSortBy] = useState<string | undefined>("");
  const [order, setOrder] = useState<string | undefined>("");
  const [toggle, setToggle] = useState<boolean>(true);

  const handleSortButton = useCallback(
    (selector?: string) => {
      if (sortBy === selector) {
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        setOrder("desc");
      }
      setSortBy(selector);
      setToggle(!toggle);
    },
    [sortBy, toggle]
  );

  return { sortBy, order, toggle, handleSortButton };
}
