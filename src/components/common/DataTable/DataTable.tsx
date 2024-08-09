import {
  Table as DataTableContainer,
  TableProps,
  TableThead as DataTableHeaderContainer,
  TableTr as TableRow,
  TableTbody as DataTableBody,
  TableCaption as DataTableFooterContainer,
  Group,
  Select,
} from "@mantine/core";
import { DataTableHeader, DataTableHeaderProps } from "./elements/DataTableHeader";
import { Dispatch, ReactNode, SetStateAction } from "react";
import classes from "./DataTable.module.css";
import { DataTableRow } from "./elements/DataTableRow";
import { DataTableData } from "./elements/DataTableData";
import { PAGE_SIZES } from "@/constants/PageSize";

export interface DataTableProps extends TableProps {
  headers: DataTableHeaderProps[];
  children: ReactNode;
  sortBy?: string;
  order?: string;
  handleSortButton?: (selector?: string) => void;
  totalSize?: string;
  pageSize?: string | null;
  setPageSize?: Dispatch<SetStateAction<string | null>>;
}

export function DataTable({
  headers,
  children,
  sortBy,
  order,
  handleSortButton,
  totalSize,
  pageSize,
  setPageSize,
  ...props
}: DataTableProps) {
  return (
    <>
      <DataTableContainer horizontalSpacing="lg" className={classes.container} {...props}>
        <DataTableHeaderContainer className={classes.header}>
          <TableRow className={classes["header-row"]}>
            {headers.map((header, index) => (
              <DataTableHeader
                key={index}
                label={header.label}
                widthPercentage={header.widthPercentage}
                sort={header.sort}
                selector={header.selector}
                sortBy={sortBy}
                order={order}
                handleSortButton={handleSortButton}
              />
            ))}
          </TableRow>
        </DataTableHeaderContainer>
        <DataTableBody>{children}</DataTableBody>
        <DataTableFooterContainer>
          <Group>
            <div>전체 {totalSize}개</div>
            <Group gap={4}>
              <Select
                h={40}
                w={80}
                placeholder="보기"
                data={PAGE_SIZES.map((pageSize) => ({
                  label: String(pageSize),
                  value: String(pageSize),
                }))}
                defaultValue={String(pageSize)}
                onChange={setPageSize}
                allowDeselect={false}
                className={classes.select}
              />
              <div>개씩 보기</div>
            </Group>
            {/* TODO: Pagenation 추가 */}
          </Group>
        </DataTableFooterContainer>
      </DataTableContainer>
    </>
  );
}

DataTable.Row = DataTableRow;
DataTable.Data = DataTableData;
