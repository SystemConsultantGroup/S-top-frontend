"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { PROJECT_TABLE_HEADERS } from "@/constants/DataTableHeaders";
import { PAGE_SIZES } from "@/constants/PageSize";
import { useProjects } from "@/hooks/swr/useProjects";
import { useTableSort } from "@/hooks/useTableSort";
import { IProjectParams } from "@/types/project";
import { CommonAxios } from "@/utils/CommonAxios";
import { handleChangeSearch } from "@/utils/handleChangeSearch";
import { Group, Stack } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { AdminProjectListRow } from "./AdminProjectsListRow";

export function AdminProjectsListSection() {
  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();
  /* 페이지당 행 개수 */
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  /* 페이지네이션 페이지 넘버*/
  const [pageNumber, setPageNumber] = useState(1);
  /* 데이터 정렬 훅 */
  const { sortBy, order, handleSortButton } = useTableSort();
  /* 쿼리 debounced state, 검색창에 이용 */
  const [query, setQuery] = useDebouncedState<IProjectParams>(
    {
      page: pageNumber - 1,
      size: Number(pageSize),
    },
    300
  );

  /* SWR 훅을 사용하여 프로젝트 목록 패칭 */
  // TODO: 백엔드 수정 이후 sort 파라미터 추가
  const { data, pageData, mutate } = useProjects({
    params: { ...query, page: pageNumber - 1, size: Number(pageSize) },
  });

  /* 체크박스 전체선택, 일괄선택 다루는 파트 */
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const allChecked = selectedProjects.length === data?.length;
  const indeterminate = selectedProjects.length > 0 && !allChecked;
  // 전체선택 함수
  const handleSelectAll = () => {
    if (data) {
      if (allChecked) {
        setSelectedProjects([]);
      } else {
        setSelectedProjects(data.map((project) => project.id));
      }
    }
  };
  // 개별선택 함수
  const handleSelect = (id: number) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((noticeId) => noticeId !== id) : [...prev, id]
    );
  };

  /* 검색창 핸들러 */
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeSearch<string, IProjectParams>({
      name: "title",
      value: event.target.value,
      setQuery,
    });
  };

  /* 삭제 버튼 핸들러 */
  const handleDelete = () => {
    // TODO: 삭제 확인하는 모달 추가
    Promise.all(selectedProjects.map((id) => CommonAxios.delete(`/projects/${id}`))).then(() => {
      setSelectedProjects([]);
      mutate();
    });
  };

  return (
    <section>
      <Stack>
        <Group justify="flex-end">
          <SearchInput placeholder="제목 입력" w={300} onChange={onSearchChange} />
        </Group>
        <Group justify="space-between">
          <DangerButton onClick={handleDelete}>선택 삭제</DangerButton>
          <PrimaryButton
            onClick={() => {
              push("projects/create");
            }}
          >
            프로젝트 등록
          </PrimaryButton>
        </Group>
        <DataTable
          headers={PROJECT_TABLE_HEADERS}
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
          {data?.map((project, index) => (
            <AdminProjectListRow
              key={index}
              project={project}
              index={index}
              pageNumber={pageNumber}
              pageSize={Number(pageSize)}
              selectedProjects={selectedProjects}
              handleSelect={handleSelect}
            />
          ))}
        </DataTable>
      </Stack>
    </section>
  );
}
