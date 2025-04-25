"use client";

import { SearchInput } from "@/components/common/SearchInput";
import { useGalleries } from "@/hooks/swr/useGalleries";
import { GalleryRequestParams } from "@/types/gallery";
import { handleChangeSearch } from "@/utils/handleChangeSearch";
import { Group, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { getYears } from "@/utils/getYears";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { MONTH_LIST } from "@/constants/MonthList";
import classes from "./GalleryListSection.module.css";
import { GalleryPreview } from "@/components/common/GalleryPreview/GalleryPreview";
import { getFileUrlById } from "@/utils/handleDownloadFile";

export function GalleryListSection() {
  const years = getYears();
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useDebouncedState<GalleryRequestParams>(
    {
      page: pageNumber - 1,
      size: 12, // 일단 페이지 사이즈 고정
      year: year ? Number(year) : undefined,
      month: month ? Number(month) : undefined,
    },
    300
  );
  const { data, pageData, mutate } = useGalleries({
    params: { ...query, page: pageNumber - 1, size: 12 } as GalleryRequestParams,
  });
  const [previewImgUrls, setPreviewImgUrls] = useState<string[]>([]);
  const router = useRouter();

  /* 페이지 변경 시 데이터 갱신 */
  useEffect(() => {
    mutate();
  }, [pageNumber, mutate]);

  /* 데이터 갱신 시 이미지 프리뷰 url 가져오기 */
  useEffect(() => {
    const fetchImgUrls = async () => {
      if (data) {
        const promises = data.map((item) => getFileUrlById(item.files[0].id));
        const urlResults = await Promise.all(promises);
        setPreviewImgUrls(urlResults);
      }
    };
    fetchImgUrls();
  }, [data]);

  /* 검색창 핸들러 */
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeSearch<string, GalleryRequestParams>({
      name: "title",
      value: event.target.value,
      setQuery,
    });
  };

  /* 연도 변경 핸들러 */
  const onYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setYear(value);
    setQuery((prev) => ({
      ...prev,
      year: value ? Number(value) : undefined,
    }));
  };

  /* 월 변경 핸들러 */
  const onMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setMonth(value);
    setQuery((prev) => ({
      ...prev,
      month: value ? Number(value) : undefined,
    }));
  };

  /* 갤러리 상세조회 핸들러 */
  const onGalleryClick = (galleryId: number) => {
    router.push(`/event/gallery/${galleryId}`);
  };

  return (
    <div className={classes.container}>
      <Group justify="flex-start">
        <SearchInput placeholder="검색" w={400} onChange={onSearchChange} />
        <Group>
          <Dropdown
            options={years}
            placeholder={"연도"}
            onOptionClick={() => onYearChange}
            selectedOption={year}
          ></Dropdown>
          <Dropdown
            options={MONTH_LIST}
            placeholder={"월"}
            onOptionClick={() => onMonthChange}
            selectedOption={month}
          ></Dropdown>
        </Group>
      </Group>
      <div className={classes.projectGrid}>
        {data &&
          data.map((item, idx) => {
            const imgUrl = previewImgUrls[idx];
            const date = new Date(item.createdAt);
            return (
              <div key={idx} onClick={() => onGalleryClick(item.id)} className={classes.gridItem}>
                <GalleryPreview
                  imgUrl={imgUrl}
                  title={item.title}
                  viewCount={item.hitCount}
                  date={date}
                />
              </div>
            );
          })}
      </div>
      {pageNumber && setPageNumber && pageData && (
        <Group justify="center" mt={20}>
          <Pagination value={pageNumber} onChange={setPageNumber} total={pageData.totalPages} />
        </Group>
      )}
    </div>
  );
}
