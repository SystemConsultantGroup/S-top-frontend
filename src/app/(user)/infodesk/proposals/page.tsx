"use client";

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { Noticeboard } from "@/components/common/Noticeboard/Noticeboard";
import { PrimaryButton } from "@/components/common/Buttons";
import styles from "./pp.module.css";
import { PagedNoticesRequestParams } from "@/types/notice";
import { Group, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useProposals } from "@/hooks/swr/useProposals";

const ProposalsPage = () => {
  const HEADING = "산학협력 과제 제안";

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
  const { data, pageData, error } = useProposals({
    params: { ...query, page: pageNumber - 1, size: pageSize },
  });

  // 검색 필터 옵션
  type OptionType = "title" | "content" | "both" | "author";
  const [option, setOption] = useState<OptionType>("both");

  // 검색 입력 처리
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery((prev) => ({
      ...prev,
      scope: option,
      terms: value !== "" ? value : undefined,
    }));
  };

  // 필터 선택 처리
  const handleSelect = (value: string | null) => {
    if (value === "1") setOption(() => "title");
    else if (value === "2") setOption(() => "content");
    else if (value === "3") setOption(() => "author");
    else setOption(() => "both");
  };
  // 분류기 설정
  const classifier = {
    data: [
      { value: "0", label: "전체" },
      { value: "1", label: "제목" },
      { value: "2", label: "내용" },
      { value: "3", label: "작성자" },
    ],
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요",
  };

  return (
    <div className={styles.backColor}>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
        />
      </div>

      <div className={styles.propose}>
        {error ? (
          <p>{error.message}</p>
        ) : (
          <>
            <Noticeboard
              handleInput={handleInput}
              handleSelect={handleSelect}
              heading={HEADING}
              classifier={classifier}
              items={data?.map((proposal) => ({
                id: proposal.id,
                title: proposal.title,
                hitCount: 0,
                fixed: false,
                createdAt: proposal.createdDate,
                updatedAt: proposal.createdDate,
              }))}
            />
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <Link href="/infodesk/proposals/write" passHref>
                <PrimaryButton style={{ width: "110px" }}>작성하기</PrimaryButton>
              </Link>
            </div>
            <Group justify="center" mt={20}>
              <Pagination
                value={pageNumber}
                onChange={(newPage) => {
                  setPageNumber(newPage);
                  setQuery((prev) => ({ ...prev, page: newPage - 1 }));
                }}
                total={pageData ? pageData.totalPages : 0}
              />
            </Group>
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalsPage;
