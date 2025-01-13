"use client";

import { Noticeboard } from "@/components/common/Noticeboard";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { useNotices } from "@/hooks/swr/useNotices";
import styles from "@/styles/UserBoard.module.css";
import { PagedNoticesRequestParams } from "@/types/notice";
import { Group, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";

export default function NoticesPage() {
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

  type OptionType = "TITLE" | "CONTENT" | "ALL";
  const [option, setOption] = useState<OptionType>("TITLE");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery((prev) => ({
      ...prev,
      title: option === "TITLE" && value !== "" ? value : undefined,
    }));
  };

  const handleSelect = (value: string | null) => {
    if (value === "0") {
      setOption(() => "TITLE");
    }
    // TODO: 내용, 제목+내용 필터링 추가
    // else if (value === "1") {
    //   optionValue = "CONTENT";
    // }
    // else {
    //   optionValue = "ALL";
    // }
  };

  const classifier = {
    data: [
      { value: "0", label: "제목" },
      // TODO: same as the previous one
      // { value: "1", label: "내용" },
      // { value: "2", label: "제목+내용" },
    ],
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요",
  };

  return (
    <>
      <SubHeadNavbar title="Info Desk" />
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
