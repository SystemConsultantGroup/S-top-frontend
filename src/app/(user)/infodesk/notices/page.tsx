"use client";

import { Banner } from "@/components/common/Banner/Banner";
import { Noticeboard } from "@/components/common/Noticeboard";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { VerticalGapBox } from "@/components/pages/VerticalGapBox";
import { bannerList } from "@/constants/BannerList";
import { useNotices } from "@/hooks/swr/useNotices";
import styles from "@/styles/UserBoard.module.css";
import { PagedNoticesRequestParams } from "@/types/notice";
import { Group, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";

export default function NoticesPage() {
  const S_TOP_BANNER_INFO = bannerList.find((item) => item.type === "S_TOP")!;

  const HEADING = "공지사항";
  /** 한 페이지 당 아이템 개수 */
  const [pageSize] = useState(20);
  /** 페이지네이션 페이지 숫자 */
  const [pageNumber, setPageNumber] = useState(1);
  /** 쿼리 정보 */
  const [query, setQuery] = useDebouncedState<PagedNoticesRequestParams>(
    {
      page: pageNumber - 1,
      size: pageSize,
    },
    300
  );

  /** SWR 훅으로 프로젝트 목록 가져오기 */
  const { data, pageData } = useNotices({
    params: { ...query, page: pageNumber - 1, size: pageSize },
    event: false,
  });

  type OptionType = "title" | "content" | "both";
  const [option, setOption] = useState<OptionType>("both");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery((prev) => ({
      ...prev,
      scope: option,
      terms: value !== "" ? value : undefined,
    }));
  };

  const handleSelect = (value: string | null) => {
    if (value === "0") {
      setOption(() => "title");
    } else if (value === "1") {
      setOption(() => "content");
    } else if (value === "2") {
      setOption(() => "both");
    }
  };

  const classifier = {
    data: [
      { value: "0", label: "제목" },
      { value: "1", label: "내용" },
      { value: "2", label: "전체" },
    ],
    defaultLabel: 2,
    searchPlaceholder: "검색어를 입력하세요",
  };

  return (
    <>
      <SubHeadNavbar title="Info Desk" />
      <Banner {...S_TOP_BANNER_INFO} />
      <VerticalGapBox gap="30px" />
      <div className={styles.container}>
        <Noticeboard
          heading={HEADING}
          handleInput={handleInput}
          handleSelect={handleSelect}
          classifier={classifier}
          items={data}
        />
        {/* 페이지네이션 */}
        {pageNumber && setPageNumber && pageData && (
          <Group justify="center" mt={20}>
            <Pagination value={pageNumber} onChange={setPageNumber} total={pageData.totalPages} />
          </Group>
        )}
      </div>
    </>
  );
}
