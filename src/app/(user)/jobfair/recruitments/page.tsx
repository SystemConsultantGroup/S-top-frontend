"use client";
import React, { useState, useEffect } from "react";
import styles from "./jobfairRe.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { SearchInput } from "@/components/common/SearchInput";
// import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { JobFairCard } from "@/components/common/JobFairCard/JobFairCard";
import { Select } from "@mantine/core";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { SelectProps } from "@mantine/core";
/** 프로젝트 필터링 옵션 분류 타입 */
export type OptionKey = "YEAR" | "CATEGORY" | "TYPE";
/**
 * 프로젝트 조회 필터링에 사용되는 옵션의 형태를 지정한 인터페이스.
 *
 * key 값에 "YEAR", "TYPE", "CATEGORY" 세 가지 중 하나를 쓸 수 있고, 해당 딕셔너리에는 카테고리에 맞게 옵션이 저장됨.
 *
 * 예를 들어, key 값이  "YEAR"인 딕셔너리는 프로젝트 연도 드롭다운에서 선택한 옵션을 value에 저장함.
 *
 * @interface IOption
 * @property {("YEAR" | "TYPE" | "CATEGORY")} key
 * @property {string} value
 */
export interface IOption {
  key: OptionKey;
  value: string;
}

interface JobInfo {
  company: string;
  jobTypes: string[];
  region: string;
  position: string;
  logo: string;
  salary: string;
  website: string;
  state: string[];
  hiringTime: string;
  object: string;
  id: string;
  url: string;
}

const RecruitmentsPage = () => {
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);
  const [options, setOptions] = useState<IOption[]>([]);

  const PROJECT_YEAR_LIST: string[] = ["2020", "2021", "2022", "2023", "2024"];
  const PROJECT_CATEGORY_MAPPED_LIST: string[] = [
    "AI 개발자",
    "Web SDK 개발자",
    "position1",
    "position2",
    "position3",
  ];
  const PROJECT_TYPE_MAPPED_LIST: string[] = ["인턴", "신입 정규직", "type1", "type2", "type3"];

  const HandleOption = (key: OptionKey, value: string) => {
    setOptions((prev) =>
      prev.some((option) => option.value === value) ? prev : [...prev, { key, value }]
    );
  };
  const UNMODIFIABLE_SELECT = "null";
  /** 공통 필터링 드롭다운 props */
  const dropdownCommonProps = {
    classNames: {
      dropdown: styles.dropdown,
      input: styles.input,
      section: styles.section,
    },
    value: UNMODIFIABLE_SELECT,
    comboboxProps: {
      dropdownPadding: 0,
      shadow: "md",
      offset: 0,
      position: "bottom",
      middlewares: { flip: false, shift: false },
    },
  } as SelectProps;

  /** 프로젝트 연도(YEAR) 필터링을 위한 드롭다운 props */
  const dropdownYearProps = {
    data: PROJECT_YEAR_LIST, // string[]
    placeholder: "연도",
    onChange: (value: string | null) => HandleOption("YEAR", value!),
    ...dropdownCommonProps,
  };
  /** 분야(CATEGORY) 필터링을 위한 드롭다운 props */
  const dropdownCategoryProps = {
    data: Object.values(PROJECT_CATEGORY_MAPPED_LIST), // string[]
    placeholder: "분야",
    onChange: (value: string | null) => HandleOption("CATEGORY", value!),
    ...dropdownCommonProps,
  };
  /** 고용 형태(TYPE) 필터링을 위한 드롭다운 props */
  const dropdownTypeProps = {
    data: Object.values(PROJECT_TYPE_MAPPED_LIST), // string[]
    placeholder: "고용 형태",
    onChange: (value: string | null) => HandleOption("TYPE", value!),
    ...dropdownCommonProps,
  };
  /** 선택한 필터링 옵션들의 props 배열 */
  const filterChipProps = options
    .map((option) => ({
      label: option.value,
      onRemove: () => {
        setOptions((prev) => prev.filter((item) => item.value !== option.value));
      },
    }))
    .reverse();

  useEffect(() => {
    const fetchJobInfos = async () => {
      try {
        const response = await fetch("http://localhost:8000/jobInfos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: 0,
            size: 10,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const validContent = data.content.filter((item: any) => item.company !== null); // null인 항목 제거
          setJobInfos(validContent); // 검증된 데이터로 상태 업데이트
          console.log("Fetched data:", data); // 데이터를 콘솔에 출력
        } else {
          console.error("Failed to fetch jobInfos");
        }
      } catch (error) {
        console.error("Error fetching jobInfos:", error);
      }
    };

    fetchJobInfos();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <SubHeadNavbar title="Job Fair" />
        <Banner
          type="PROJECT"
          title="잡페어"
          subtitle="Job Fair"
          text="S-TOP Job Fair는 현업에 종사하고 있는 선배 개발자님들과 실무 경험을 얻고자 하는 학생들을 연결하여, IT 인재 양성 문화를 함께 만들기 위해 기획되었습니다."
        />
      </div>
      <div className={styles.backColor}>
        <div className={styles.search}>
          <h2 className={styles.title}>채용 포지션</h2>
          <div className={styles.searchArea}>
            <SearchInput placeholder="채용 포지션 검색" />
          </div>
        </div>
        <div className={styles.dropdown}>
          <Select {...dropdownYearProps} />
          <Select {...dropdownTypeProps} />
          <Select {...dropdownCategoryProps} />
        </div>
        <div>
          {filterChipProps.map((prop, idx) => (
            <FilterChip key={idx} {...prop} />
          ))}
          <FilterChip
            label="전체해제"
            onRemove={() => {
              setOptions(() => []);
            }}
            isReset
          />
        </div>
        <div className={styles.videoGrid}>
          {jobInfos.map((jobInfo) => (
            <JobFairCard
              key={jobInfo.id}
              logo={jobInfo.url} // 로고 이미지 URL
              company={jobInfo.company} // 회사명
              position={jobInfo.position} // 포지션 제목
              employmentType={jobInfo.jobTypes} // 고용 형태 배열
              location={jobInfo.region} // 근무 지역
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentsPage;
