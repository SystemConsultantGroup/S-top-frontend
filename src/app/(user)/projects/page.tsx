/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Banner } from "@/components/common/Banner/Banner";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { ProjectCard } from "@/components/common/ProjectCard";
import { SearchInput } from "@/components/common/SearchInput";
import { bannerList } from "@/constants/BannerList";
import {
  PROJECT_YEAR_LIST,
  PROJECT_TYPE_MAPPED_LIST,
  PROJECT_CATEGORY_MAPPED_LIST,
} from "@/constants/TextMapping";
import { useProjects } from "@/hooks/swr/useProjects";
import { useTableSort } from "@/hooks/useTableSort";
import { IProjectRequestParams } from "@/types/project";
import { getFileUrlById } from "@/utils/handleDownloadFile";
import { SelectProps, Stack, Group, Button, Select, Pagination } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useState, useEffect } from "react";
import styles from "./Projects.module.css";

export default function ProjectsPage() {
  /**
   * 배너 정보
   * /projects에 해당하는 배너 정보를 bannerList로부터 가져와 저장함.
   *
   * item.type는 Banner.tsx > ImageType에 정의되어 있음.
   */
  const PROJECT_BANNER_INFO = bannerList.find((item) => item.type === "PROJECT")!;

  /** 한 페이지 당 아이템 개수 */
  const [pageSize, setPageSize] = useState(20);
  /** 페이지네이션 페이지 숫자 */
  const [pageNumber, setPageNumber] = useState(1);
  /** 데이터 정렬 훅 */
  const { sortBy, order, handleSortButton } = useTableSort();
  /** 쿼리 정보 */
  const [query, setQuery] = useDebouncedState<IProjectRequestParams>(
    {
      page: pageNumber - 1,
      size: pageSize,
    },
    300
  );

  /** SWR 훅으로 프로젝트 목록 가져오기 */
  const { data, pageData, mutate } = useProjects({
    params: { ...query, page: pageNumber - 1, size: pageSize },
  });

  /**
   * 프로젝트 데이터와 사진까지 모두 가져왔는지 여부를 확인함.
   * - false: 사진을 다운받고 있는 중으로 유저 화면에선 Loading에 해당하는 화면이 나옴.
   * - true: 모두 로드되었다는 뜻으로 한 번에 일괄적으로 프로젝트 목록이 보여짐.
   */
  const [loaded, setLoaded] = useState(false);
  /** 프로젝트에 대한 사진을 render 이전에 미리 리스트에 저장함. */
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  /** 변경된 프로젝트 데이터에 따라 사진 정보를 업데이트함. */
  useEffect(() => {
    if (data && data.length) {
      const loadImages = async () => {
        const promises = data.map((item) => getFileUrlById(item.thumbnailInfo.id));
        const urls = await Promise.all(promises);
        setThumbnails(urls);
        setLoaded(true);
      };
      loadImages();
    }
  }, [data]);

  /**
   * 탭 정보
   * - 0: S-TOP 이벤트 프로젝트 (당해년도 프로젝트)
   * - 1: 전체 프로젝트
   */
  const [tab, setTab] = useState(0);
  /**
   * 버튼을 클릭했을 때 화면을 해당 탭으로 바꾸어주는 함수.
   * @param val 해당 버튼의 탭 번호
   */
  const onTabChange = (val: number) => {
    setOptions(() => []);
    setTab(() => val);
  };
  /**
   * 탭이 활성 상태일 경우와 그렇지 않을 경우 각각에 맞는 버튼 스타일을 반환하는 함수.
   * @param val 해당 버튼의 탭 번호
   * @returns 스타일
   */
  const TabButtonStyle = (val: number) => {
    const isActive = tab === val ? styles.active : styles.dormant;
    return `${styles.tabBtn} ${isActive}`;
  };

  /** 프로젝트 필터링 옵션 분류 타입 */
  type OptionKey = "YEAR" | "TYPE" | "CATEGORY";
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
  interface IOption {
    key: OptionKey;
    value: string;
  }
  /** 프로젝트 필터링 state */
  const [options, setOptions] = useState<IOption[]>([]);

  /** 프로젝트 필터링 state 값이 바뀌었을 때 백엔드에 접근하여 필터링된 데이터를 가져옴. */
  useEffect(() => {
    const yearOptions = options
      .filter((option) => option.key === "YEAR")
      .map((option) => Number(option.value));
    const typeOptions = options
      .filter((option) => option.key === "TYPE")
      .map((option) => option.value);
    const categoryOptions = options
      .filter((option) => option.key === "CATEGORY")
      .map((option) => option.value);

    if (tab === 0) yearOptions.push(Number(PROJECT_YEAR_LIST[0]));
    // TODO: 백엔드 업데이트 받아서 year, type, category 연결
    // setQuery((prev) => ({
    //   ...prev,
    //   year: yearOptions,
    // }));
    setQuery((prev) => ({
      ...prev,
      year: tab === 0 ? Number(PROJECT_YEAR_LIST[0]) : null,
    }));
  }, [tab, options]);

  /**
   * 옵션 값을 받아 그 값이 해당 카테고리에 중복되지 않는지 점검하고 프로젝트 필터링 state를 업데이트하는 모듈 함수.
   * @param key 카테고리
   * @param value 옵션 값
   */
  const HandleOption = (key: OptionKey, value: string) => {
    setOptions((prev) =>
      prev.some((option) => option.value === value) ? prev : [...prev, { key, value }]
    );
  };

  /**
   * 필터링 드롭다운 옵션을 선택한 후 그 옵션으로 보여지는 값이 바뀌면 안 되므로
   * value를 null로 고정해서 placeholder만 계속 보여지도록 설정하기 위한 목적의 변수.
   */
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
    data: PROJECT_YEAR_LIST,
    placeholder: "연도",
    onChange: (value: string | null) => HandleOption("YEAR", value!),
    ...dropdownCommonProps,
  };
  /** 프로젝트 종류(TYPE) 필터링을 위한 드롭다운 props */
  const dropdownTypeProps = {
    data: Object.values(PROJECT_TYPE_MAPPED_LIST),
    placeholder: "프로젝트 종류",
    onChange: (value: string | null) => HandleOption("TYPE", value!),
    ...dropdownCommonProps,
  };
  /** 프로젝트 분야(CATEGORY) 필터링을 위한 드롭다운 props */
  const dropdownCategoryProps = {
    data: Object.values(PROJECT_CATEGORY_MAPPED_LIST),
    placeholder: "프로젝트 분야",
    onChange: (value: string | null) => HandleOption("CATEGORY", value!),
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

  /**
   * 반응형 디자인을 위한 screen width와 height
   * - width: 프로젝트 아이템이 한 줄에 몇 개가 배치되는지 screen width에 따라 달라지므로
   * 숫자를 맞추기 위해 채워야 하는 더미 아이템을 dynamic하게 만들어 그리드를 유지하는 역할을 수행함.
   */
  const { width: screenWidth } = useWindowSize();

  return (
    <main>
      <Banner {...PROJECT_BANNER_INFO} />
      <VerticalGapBox gap="30px" />
      <div className={styles.container}>
        <Stack align="center" gap="30px">
          <Group className={styles.tabBtnBox} justify="space-between" grow>
            <Button className={TabButtonStyle(0)} onClick={() => onTabChange(0)}>
              S-TOP 이벤트 프로젝트
            </Button>
            <Button className={TabButtonStyle(1)} onClick={() => onTabChange(1)}>
              전체 프로젝트{" "}
            </Button>
          </Group>
          <Stack className={styles.filterBox}>
            <SearchInput />
            <Group justify="space-between" grow>
              {tab === 1 && <Select {...dropdownYearProps} />}
              <Select {...dropdownTypeProps} />
              <Select {...dropdownCategoryProps} />
            </Group>
            <Group justify="flex-start">
              {filterChipProps.length && (
                <>
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
                </>
              )}
            </Group>
          </Stack>
          <Group justify="space-evenly">
            {!data || !loaded ? (
              <div>Loading...</div>
            ) : data.length ? (
              (() => {
                const rowCount = getItemCountPerRow(screenWidth);
                const dummyCount = (rowCount - (data.length % rowCount)) % rowCount;

                const projectCards = data.map((item, idx) => (
                  <ProjectCard key={idx} data={item} thumbnailUrl={thumbnails[idx]} />
                ));

                const dummyCards = Array(dummyCount)
                  .fill(null)
                  .map((_, idx) => <DummyCard key={`dummy-${idx}`} />);

                return [...projectCards, ...dummyCards];
              })()
            ) : (
              <span>검색 결과가 없습니다.</span>
            )}
          </Group>
          {pageNumber && setPageNumber && pageData && (
            <Pagination value={pageNumber} onChange={setPageNumber} total={pageData.totalPages} />
          )}
        </Stack>
      </div>
      <VerticalGapBox gap="60px" />
    </main>
  );
}

/**
 * 세로로 배열되는 컴포넌트들의 사이에 여백을 놓는 함수.
 * @param gap 여백 크기
 * @returns 여백이 적용된 styled div
 */
function VerticalGapBox({ gap }: { gap: string }) {
  return <div style={{ height: gap }}></div>;
}

/**
 * 프로젝트 그리드를 유지하기 위해 사용되는 더미 아이템을 반환하는 함수.
 * @returns 스타일이 적용된 className을 가진 div
 */
function DummyCard() {
  return <div className={styles.dummyCard} />;
}

/**
 * screen 크기를 알려주는 hook
 * @returns screen 크기
 */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

/** screen width가 얼만할 때마다 그리드가 달라지는지 그 크기를 매핑한 enum. */
enum Breakpoint {
  Large = 1280,
  Medium = 1024,
  Small = 768,
  ExtraSmall = 0,
}
/**
 * screen width에 따라 그리드 아이템 개수를 반환하는 함수.
 * @param width screen width
 * @returns 그리드 아이템 개수
 */
function getItemCountPerRow(width: number) {
  if (width >= Breakpoint.Large) {
    return 4;
  } else if (width >= Breakpoint.Medium) {
    return 3;
  } else if (width >= Breakpoint.Small) {
    return 2;
  } else {
    return 1;
  }
}
