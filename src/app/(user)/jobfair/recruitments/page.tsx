"use client";
import { Banner } from "@/components/common/Banner/Banner";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { JobFairCard } from "@/components/common/JobFairCard/JobFairCard";
import { SearchInput } from "@/components/common/SearchInput";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { Group, Select, SelectProps } from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./jobfairRe.module.css";

export type OptionKey = "REGION" | "CATEGORY" | "TYPE";

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
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const PROJECT_REGION_LIST: string[] = ["region1", "region2", "region3", "region4"];
  const PROJECT_CATEGORY_MAPPED_LIST: string[] = [
    "AI 개발자",
    "Web SDK 개발자",
    "position1",
    "position2",
    "position3",
  ];
  const PROJECT_TYPE_MAPPED_LIST: string[] = ["인턴", "신입 정규직", "type1", "type2", "type3"];

  // 필터링 로직
  const filteredJobInfos = jobInfos.filter((jobInfo) => {
    const matchesFilters = options.every((option) => {
      if (option.key === "REGION") {
        return jobInfo.region.includes(option.value); // 지역 필터
      }
      if (option.key === "CATEGORY") {
        return jobInfo.position.includes(option.value); // 포지션 필터
      }
      if (option.key === "TYPE") {
        return jobInfo.jobTypes.includes(option.value); // 고용 형태 필터
      }
      return true;
    });

    const matchesSearch = jobInfo.company.toLowerCase().includes(searchTerm.toLowerCase()); // 검색 필터

    return matchesFilters && matchesSearch;
  });

  const getValueByLabel = (key: OptionKey, label: string): string | null => {
    if (!label) return null;

    const map = {
      REGION: PROJECT_REGION_LIST,
      CATEGORY: PROJECT_CATEGORY_MAPPED_LIST,
      TYPE: PROJECT_TYPE_MAPPED_LIST,
    };

    const options = map[key];
    if (!options) return null;

    return options.find((option) => option === label) || null;
  };

  const HandleOption = (key: OptionKey, label: string) => {
    const value = getValueByLabel(key, label)!;
    setOptions((prev) =>
      prev.some((option) => option.value === value) ? prev : [...prev, { key, value }]
    );
  };

  const UNMODIFIABLE_SELECT = "null";
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
    maxDropdownHeight: "240px",
  } as SelectProps;

  const dropdownRegionProps = {
    data: PROJECT_REGION_LIST,
    placeholder: "지역",
    onChange: (value: string | null) => HandleOption("REGION", value!),
    ...dropdownCommonProps,
  };

  const dropdownCategoryProps = {
    data: Object.values(PROJECT_CATEGORY_MAPPED_LIST),
    placeholder: "분야",
    onChange: (value: string | null) => HandleOption("CATEGORY", value!),
    ...dropdownCommonProps,
  };

  const dropdownTypeProps = {
    data: Object.values(PROJECT_TYPE_MAPPED_LIST),
    placeholder: "고용 형태",
    onChange: (value: string | null) => HandleOption("TYPE", value!),
    ...dropdownCommonProps,
  };

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
        const response = await fetch("https://stop.scg.skku.ac.kr/jobInfos", {
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
          const validContent = data.content.map((item: any) => ({
            ...item,
            logo: item.logo || "/images/logo.png",
          }));
          setJobInfos(validContent);
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
          <SearchInput
            placeholder="회사명 검색"
            onChange={(e) => setSearchTerm(e.target.value)} // 검색 상태 업데이트
          />
          <Group justify="space-between" grow mt={15}>
            <Select radius={8} {...dropdownCategoryProps} />
            <Select radius={8} {...dropdownRegionProps} />
            <Select radius={8} {...dropdownTypeProps} />
          </Group>
          <div className={styles.filterContainer}>
            {filterChipProps.map((prop, idx) => (
              <FilterChip key={idx} {...prop} />
            ))}
            {filterChipProps.length ? (
              <FilterChip
                label="전체해제"
                onRemove={() => {
                  setOptions(() => []);
                }}
                isReset
              />
            ) : null}
          </div>
        </div>
        <div className={styles.videoGrid}>
          {filteredJobInfos.map((jobInfo) => (
            <JobFairCard
              key={jobInfo.id}
              logo={jobInfo.logo}
              company={jobInfo.company}
              position={jobInfo.position}
              employmentType={jobInfo.jobTypes}
              location={jobInfo.region}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentsPage;
