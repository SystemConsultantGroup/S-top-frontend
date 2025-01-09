import { DataTable } from "@/components/common/DataTable";
import { DataTableData } from "@/components/common/DataTable/elements/DataTableData";
import { DataTableRow } from "@/components/common/DataTable/elements/DataTableRow";
import { QUIZ_TABLE_HEADERS } from "@/constants/DataTableHeaders";
import { PAGE_SIZES } from "@/constants/PageSize";
import { useQuizResults } from "@/hooks/swr/useQuizResults";
import { useTableSort } from "@/hooks/useTableSort";
import { Stack } from "@mantine/core";
import { useState } from "react";

export function AdminQuizListSection() {
  /* 페이지당 행 개수 */
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  /* 페이지네이션 페이지 넘버*/
  const [pageNumber, setPageNumber] = useState(1);
  /* 데이터 정렬 훅 */
  const { sortBy, order, handleSortButton } = useTableSort();

  /* SWR 훅을 사용하여 공지사항 목록 패칭 */
  const { data, pageData } = useQuizResults({
    params: { page: pageNumber - 1, size: Number(pageSize) },
  });

  return (
    <>
      <Stack>
        <DataTable
          headers={QUIZ_TABLE_HEADERS}
          sortBy={sortBy}
          order={order}
          handleSortButton={handleSortButton}
          totalElements={String(pageData?.totalElements)}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={pageData?.totalPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        >
          {data?.map((quiz, index) => (
            <DataTableRow key={index}>
              <DataTableData>{index + 1 + (pageNumber - 1) * Number(pageSize)}</DataTableData>
              <DataTableData>{quiz.name}</DataTableData>
              <DataTableData>{quiz.email}</DataTableData>
              <DataTableData>{quiz.phone}</DataTableData>
              <DataTableData>{quiz.successCount}</DataTableData>
            </DataTableRow>
          ))}
        </DataTable>
      </Stack>
    </>
  );
}
