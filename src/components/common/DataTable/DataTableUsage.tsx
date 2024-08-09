/* example usage */

import { useMemo, useState } from "react";
import { MockUsersData } from "./_mock/mock-table-data";
import { DataTable } from "./DataTable";
import { MOCK_TABLE_HEADERS } from "@/constants/DataTableHeaders";
import { useTableSort } from "@/hooks/useTableSort";

export function DataTableUsage() {
  const data = MockUsersData;
  const total = "168";
  const [pageSize, setPageSize] = useState<string | null>("10");

  const { sortBy, order, toggle, handleSortButton } = useTableSort();

  const makeSortData = () => {
    const sortOrder = order === "asc" ? 1 : -1;

    return data.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case "name":
          compareValue = a.name > b.name ? 1 : -1;
          break;
        case "email":
          compareValue = a.email > b.email ? 1 : -1;
          break;
        case "belonging":
          compareValue = a.belonging > b.belonging ? 1 : -1;
          break;
        case "position":
          compareValue = a.position > b.position ? 1 : -1;
          break;
        case "role":
          compareValue = a.role > b.role ? 1 : -1;
          break;
        default:
          return 0;
      }

      return compareValue * sortOrder;
    });
  };

  const sortedData = useMemo(() => makeSortData(), [toggle, order]);

  return (
    <DataTable
      headers={MOCK_TABLE_HEADERS}
      sortBy={sortBy}
      order={order}
      handleSortButton={handleSortButton}
      w={900}
      totalSize={total}
      pageSize={pageSize}
      setPageSize={setPageSize}
    >
      {sortedData.map((user, index) => (
        <DataTable.Row key={index} onClick={() => {}}>
          <DataTable.Data>{user.name}</DataTable.Data>
          <DataTable.Data>{user.email}</DataTable.Data>
          <DataTable.Data maxWidth="160px">{user.belonging}</DataTable.Data>
          <DataTable.Data>{user.position}</DataTable.Data>
          <DataTable.Data>{user.role}</DataTable.Data>
          <DataTable.Data>{user.createdAt}</DataTable.Data>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
