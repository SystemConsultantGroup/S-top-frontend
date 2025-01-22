"use client";

import React, { useState, ChangeEvent } from "react";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { Noticeboard } from "@/components/common/Noticeboard/Noticeboard";
import classes from "./projectQA.module.css";
import { PagedNoticesRequestParams } from "@/types/notice";
import { Group, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useInquiries } from "@/hooks/swr/useInquiries";

export default function InquiriesPage() {
  const heading = "프로젝트 문의";

  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useDebouncedState<PagedNoticesRequestParams>(
    {
      page: pageNumber - 1,
      size: pageSize,
    },
    300
  );

  const { data, pageData } = useInquiries({
    params: { ...query, page: pageNumber - 1, size: pageSize },
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
      <div className={classes.subHeadNavbar}>
        <SubHeadNavbar title="Info Desk" />
      </div>

      <div className={classes.banner}>
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
          width="100%"
        />
      </div>

      <div className={classes.mainContent}>
        <Noticeboard
          heading={heading}
          handleInput={handleInput}
          handleSelect={handleSelect}
          classifier={classifier}
          items={data}
        />
        {pageNumber && setPageNumber && pageData && (
          <Group justify="center" mt={20}>
            <Pagination value={pageNumber} onChange={setPageNumber} total={pageData.totalPages} />
          </Group>
        )}
      </div>
    </>
  );
}
