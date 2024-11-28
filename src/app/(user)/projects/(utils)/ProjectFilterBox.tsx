import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { SearchInput } from "@/components/common/SearchInput";
import {
  PROJECT_YEAR_LIST,
  PROJECT_TYPE_MAPPED_LIST,
  PROJECT_CATEGORY_MAPPED_LIST,
} from "@/constants/TextMapping";
import { IProjectRequestParams, ProjectType, ProjectCategory } from "@/types/project";
import { SelectProps, Stack, Group, Select } from "@mantine/core";
import { SetStateAction, ChangeEvent } from "react";
import styles from "../Projects.module.css";
import { IOption, OptionKey } from "../type";

interface IProjectFilterBox {
  setQuery: (value: SetStateAction<IProjectRequestParams>) => void;
  tab: number;
  options: IOption[];
  setOptions: (value: SetStateAction<IOption[]>) => void;
}

export function ProjectFilterBox({ setQuery, tab, options, setOptions }: IProjectFilterBox) {
  /**
   * 옵션 값을 받아 그 값이 해당 카테고리에 중복되지 않는지 점검하고 프로젝트 필터링 state를 업데이트하는 모듈 함수.
   * @param key 카테고리
   * @param value 옵션 값
   */
  const HandleOption = (key: OptionKey, label: string) => {
    const value = getValueByLabel(key, label)!;
    setOptions((prev) =>
      prev.some((option) => option.value === value) ? prev : [...prev, { key, value, label }]
    );
  };
  /**
   * 검색창에 무언가를 입력할 때 지금까지 입력된 검색어를 query에 업데이트하는 핸들러.
   * @param e 검색창 onChange에서 넘겨주는 이벤트 정보
   */
  const HandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery((prev) => ({
      ...prev,
      title: value === "" ? undefined : value,
    }));
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
    maxDropdownHeight: "240px",
  } as SelectProps;

  /** 프로젝트 연도(YEAR) 필터링을 위한 드롭다운 props */
  const dropdownYearProps = {
    data: PROJECT_YEAR_LIST,
    placeholder: "연도",
    onChange: (label: string | null) => HandleOption("YEAR", label!),
    ...dropdownCommonProps,
  };

  /** 프로젝트 종류(TYPE) 필터링을 위한 드롭다운 props */
  const dropdownTypeProps = {
    data: Object.values(PROJECT_TYPE_MAPPED_LIST),
    placeholder: "프로젝트 종류",
    onChange: (label: string | null) => HandleOption("TYPE", label!),
    ...dropdownCommonProps,
  };

  /** 프로젝트 분야(CATEGORY) 필터링을 위한 드롭다운 props */
  const dropdownCategoryProps = {
    data: Object.values(PROJECT_CATEGORY_MAPPED_LIST),
    placeholder: "프로젝트 분야",
    onChange: (label: string | null) => HandleOption("CATEGORY", label!),
    ...dropdownCommonProps,
  };

  /** 선택한 필터링 옵션들의 props 배열 */
  const filterChipProps = options
    .map((option) => ({
      label: option.label,
      onRemove: () => {
        setOptions((prev) => prev.filter((item) => item.value !== option.value));
      },
    }))
    .reverse();

  return (
    <Stack className={styles.filterBox}>
      <SearchInput onChange={HandleSearch} />
      <Group justify="space-between" grow>
        {tab === 1 && <Select {...dropdownYearProps} />}
        <Select {...dropdownTypeProps} />
        <Select {...dropdownCategoryProps} />
      </Group>
      <Group justify="flex-start">
        {filterChipProps.length && (
          <>
            {filterChipProps.map((prop, idx) => (
              <FilterChip key={`filterchip-${idx}`} {...prop} />
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
  );
}

/**
 * 필터링 클립에 보여주기 위해 선택한 옵션에 해당하는 이름을 반환하는 함수.
 * @param key 드롭다운 옵션 타입
 * @param value 드롭다운 옵션 value
 * @returns 해당 드롭다운 옵션 label
 */
function getValueByLabel(key: OptionKey, value: string) {
  if (key === "YEAR") {
    return value;
  } else if (key === "TYPE") {
    return (Object.keys(PROJECT_TYPE_MAPPED_LIST) as ProjectType[]).find(
      (key) => PROJECT_TYPE_MAPPED_LIST[key] === value
    );
  } else if (key === "CATEGORY") {
    return (Object.keys(PROJECT_CATEGORY_MAPPED_LIST) as ProjectCategory[]).find(
      (key) => PROJECT_CATEGORY_MAPPED_LIST[key] === value
    );
  }
}
