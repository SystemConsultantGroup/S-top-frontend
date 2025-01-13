import {
  Table as DataTableContainer,
  TableProps,
  TableThead as DataTableHeaderContainer,
  TableTr as TableRow,
  TableTbody as DataTableBody,
  TableCaption as DataTableFooterContainer,
  Group,
  Select,
  Pagination,
  Checkbox,
  TableTh,
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
  withCheckbox?: boolean;
  checkboxProps?: {
    checked: boolean;
    indeterminate: boolean;
    onChange: () => void;
  };
  sortBy?: string;
  order?: string;
  handleSortButton?: (selector?: string) => void;

  totalElements?: string;
  pageSize?: string | null;
  setPageSize?: Dispatch<SetStateAction<string | null>>;

  totalPages?: number;
  pageNumber?: number;
  setPageNumber?: Dispatch<SetStateAction<number>>;
}

export function DataTable({
  headers,
  children,
  withCheckbox,
  checkboxProps,
  sortBy,
  order,
  handleSortButton,
  totalElements,
  pageSize,
  setPageSize,
  totalPages,
  pageNumber,
  setPageNumber,
  ...props
}: DataTableProps) {
  return (
    <>
      <DataTableContainer horizontalSpacing="lg" className={classes.container} {...props}>
        <DataTableHeaderContainer className={classes.header}>
          <TableRow className={classes["header-row"]}>
            {withCheckbox && (
              <TableTh style={{ width: "1%", borderTopLeftRadius: "10px" }}>
                <Checkbox
                  checked={checkboxProps?.checked}
                  indeterminate={checkboxProps?.indeterminate}
                  onChange={checkboxProps?.onChange}
                />
              </TableTh>
            )}
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
          <Group justify="space-between">
            <Group gap={4}>
              <div>전체 {totalElements}개</div>
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
            {pageNumber && setPageNumber && totalPages && (
              <Pagination
                value={pageNumber}
                onChange={setPageNumber}
                total={totalPages}
                classNames={{ control: classes["pagination-control"] }}
              />
            )}
          </Group>
        </DataTableFooterContainer>
      </DataTableContainer>
    </>
  );
}

DataTable.Row = DataTableRow;
DataTable.Data = DataTableData;
