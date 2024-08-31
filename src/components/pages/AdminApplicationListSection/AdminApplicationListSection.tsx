"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { DataTable } from "@/components/common/DataTable";
import { DataTableData } from "@/components/common/DataTable/elements/DataTableData";
import { DataTableRow } from "@/components/common/DataTable/elements/DataTableRow";
import { APPLICATION_TABLE_HEADERS } from "@/constants/DataTableHeaders";
import { PAGE_SIZES, REFRESH_DEFAULT_PAGE_NUMBER } from "@/constants/PageSize";
import { useApplications } from "@/hooks/swr/useApplications";
import { useTableSort } from "@/hooks/useTableSort";
import { CommonAxios } from "@/utils/CommonAxios";
import { Button, Checkbox, Group, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminApplicationListSection() {
  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();
  /* 페이지당 행 개수 */
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  /* 페이지네이션 페이지 넘버*/
  const [pageNumber, setPageNumber] = useState(1);
  /* 데이터 정렬 훅 */
  const { sortBy, order, handleSortButton } = useTableSort();

  /* SWR 훅을 사용하여 공지사항 목록 패칭 */
  // TODO: 백엔드 수정 이후 sort 파라미터 추가
  const { data, pageData, mutate } = useApplications({
    params: { page: pageNumber - 1, size: Number(pageSize) },
  });

  /* 체크박스 전체선택, 일괄선택 다루는 파트 */
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const allChecked = selectedApplications.length === data?.length;
  const indeterminate = selectedApplications.length > 0 && !allChecked;
  // 전체선택 함수
  const handleSelectAll = () => {
    if (data) {
      if (allChecked) {
        setSelectedApplications([]);
      } else {
        setSelectedApplications(data.map((application) => application.id));
      }
    }
  };
  // 개별선택 함수
  const handleSelect = (id: number) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((applicationId) => applicationId !== id) : [...prev, id]
    );
  };

  /* 삭제 버튼 핸들러 */
  const handleDelete = () => {
    // TODO: 삭제 확인하는 모달 추가
    Promise.all(selectedApplications.map((id) => CommonAxios.delete(`/applications/${id}`))).then(
      () => {
        setSelectedApplications([]);
        mutate();
      }
    );
  };

  useEffect(() => {
    setPageNumber(REFRESH_DEFAULT_PAGE_NUMBER);
  }, [data, pageSize]);

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <DangerButton onClick={handleDelete}>선택 삭제</DangerButton>
          <PrimaryButton
            onClick={() => {
              push("notices/create");
            }}
          >
            게시글 등록
          </PrimaryButton>
        </Group>
        <DataTable
          headers={APPLICATION_TABLE_HEADERS}
          sortBy={sortBy}
          order={order}
          handleSortButton={handleSortButton}
          totalElements={String(pageData?.totalElements)}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={pageData?.totalPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          withCheckbox
          checkboxProps={{ checked: allChecked, indeterminate, onChange: handleSelectAll }}
        >
          {data?.map((application, index) => (
            <DataTableRow key={index}>
              <DataTableData text={false}>
                <Checkbox
                  checked={selectedApplications.includes(application.id)}
                  onChange={() => handleSelect(application.id)}
                />
              </DataTableData>
              <DataTableData>{index + 1 + (pageNumber - 1) * Number(pageSize)}</DataTableData>
              <DataTableData>{application.name}</DataTableData>
              <DataTableData>{application.division}</DataTableData>
              <DataTableData>{application.position}</DataTableData>
              <DataTableData>{application.userType}</DataTableData>
              <DataTableData>{application.createdAt}</DataTableData>
              <DataTableData text={false}>
                <Button>수정</Button>
              </DataTableData>
            </DataTableRow>
          ))}
        </DataTable>
      </Stack>
    </>
  );
}
