"use client";

import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { DataTable } from "@/components/common/DataTable";
import { DataTableData } from "@/components/common/DataTable/elements/DataTableData";
import { DataTableRow } from "@/components/common/DataTable/elements/DataTableRow";
import { SearchInput } from "@/components/common/SearchInput";
import { GALLERY_TABLE_HEADERS } from "@/constants/DataTableHeaders";
import { PAGE_SIZES, REFRESH_DEFAULT_PAGE_NUMBER } from "@/constants/PageSize";
import { useGalleries } from "@/hooks/swr/useGalleries";
import { useTableSort } from "@/hooks/useTableSort";
import { GalleryRequestParams } from "@/types/gallery";
import { CommonAxios } from "@/utils/CommonAxios";
import { handleChangeSearch } from "@/utils/handleChangeSearch";
// import { getSortString } from "@/utils/getSortString";
import { Button, Checkbox, Group, Stack } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconPinFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function GalleryListSection() {
  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();
  const url = "galleries";

  /* 페이지당 행 개수 */
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  /* 페이지네이션 페이지 넘버*/
  const [pageNumber, setPageNumber] = useState(1);
  /* 데이터 정렬 훅 */
  const { sortBy, order, handleSortButton } = useTableSort();
  /* 쿼리 debounced state, 검색창에 이용 */
  const [query, setQuery] = useDebouncedState<GalleryRequestParams>(
    {
      page: pageNumber - 1,
      size: Number(pageSize),
    },
    300
  );

  /* SWR 훅을 사용하여 공지사항 목록 패칭 */
  // TODO: 백엔드 수정 이후 sort 파라미터 추가
  const { data, pageData, mutate } = useGalleries({
    params: { ...query, page: pageNumber - 1, size: Number(pageSize) },
  });

  /* 체크박스 전체선택, 일괄선택 다루는 파트 */
  const [selectedGalleries, setSelectedGalleries] = useState<number[]>([]);
  const allChecked = selectedGalleries.length === data?.length;
  const indeterminate = selectedGalleries.length > 0 && !allChecked;
  // 전체선택 함수
  const handleSelectAll = () => {
    if (data) {
      if (allChecked) {
        setSelectedGalleries([]);
      } else {
        setSelectedGalleries(data.map((gallery) => gallery.id));
      }
    }
  };
  // 개별선택 함수
  const handleSelect = (id: number) => {
    setSelectedGalleries((prev) =>
      prev.includes(id) ? prev.filter((galleryId) => galleryId !== id) : [...prev, id]
    );
  };

  /* 검색창 핸들러 */
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeSearch<string, GalleryRequestParams>({
      name: "title",
      value: event.target.value,
      setQuery,
    });
    setPageNumber(1);
  };

  /* 삭제 버튼 핸들러 */
  const handleDelete = () => {
    // TODO: 삭제 확인하는 모달 추가
    Promise.all(selectedGalleries.map((id) => CommonAxios.delete(`/${url}/${id}`))).then(() => {
      setSelectedGalleries([]);
      mutate();
    });
  };

  useEffect(() => {
    setPageNumber(REFRESH_DEFAULT_PAGE_NUMBER);
  }, [pageSize]);

  return (
    <>
      <Stack>
        <Group justify="flex-end">
          <SearchInput placeholder="제목 입력" w={300} onChange={onSearchChange} />
        </Group>
        <Group justify="space-between">
          <DangerButton onClick={handleDelete}>선택 삭제</DangerButton>
          <PrimaryButton
            onClick={() => {
              push(`/admin/gallery-create`);
            }}
          >
            사진 등록
          </PrimaryButton>
        </Group>
        <DataTable
          headers={GALLERY_TABLE_HEADERS}
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
          {data?.map((gallery, index) => (
            <DataTableRow key={index}>
              <DataTableData text={false}>
                <Checkbox
                  checked={selectedGalleries.includes(gallery.id)}
                  onChange={() => handleSelect(gallery.id)}
                />
              </DataTableData>
              <DataTableData>{index + 1 + (pageNumber - 1) * Number(pageSize)}</DataTableData>
              <DataTableData text={false}>
                <Group>
                  {gallery.fixed && <IconPinFilled />}
                  {gallery.title}
                </Group>
              </DataTableData>
              <DataTableData>{gallery.year}</DataTableData>
              <DataTableData>{gallery.month}</DataTableData>
              <DataTableData>{gallery.createdAt}</DataTableData>
              <DataTableData text={false}>
                <Button
                  onClick={() => {
                    push(`/admin/gallery/${gallery.id}`);
                  }}
                >
                  수정
                </Button>
              </DataTableData>
            </DataTableRow>
          ))}
        </DataTable>
      </Stack>
    </>
  );
}
