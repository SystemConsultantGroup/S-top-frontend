import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { SearchInput } from "@/components/common/SearchInput";
import { Stack, Group } from "@mantine/core";
import { Dispatch } from "react";
import { IFilterState, IAction, ADD, RESET, DELETE } from "../filterReducer";
import { DropdownList } from "./DropdownList";
import styles from "../Project.module.css";

export interface IFilterReducer {
  filters: IFilterState[];
  dispatch: Dispatch<IAction>;
}

type filterContainerProps = IFilterReducer;

export function FilterContainer({ filters, dispatch }: filterContainerProps) {
  const handleYear = (value: string) => {
    dispatch({ type: ADD, payload: { category: "YEAR", label: value } });
  };

  const handleKind = (value: string) => {
    dispatch({ type: ADD, payload: { category: "KIND", label: value } });
  };

  const handleField = (value: string) => {
    dispatch({ type: ADD, payload: { category: "FIELD", label: value } });
  };

  const handleClipReset = () => {
    dispatch({ type: RESET });
  };

  return (
    <>
      <Stack className={styles.filterBox}>
        <SearchInput />
        <Group justify="space-between">
          <DropdownList
            onYearSelect={handleYear}
            onKindSelect={handleKind}
            onFieldSelect={handleField}
          />
        </Group>
        <Group>
          {filters.map((filter, idx) => {
            const onRemove = () => {
              dispatch({
                type: DELETE,
                payload: { category: filter.category, label: filter.label },
              });
            };
            return <FilterChip key={idx} label={filter.label} onRemove={onRemove} />;
          })}
          {filters.length && <FilterChip label="전체해제" onRemove={handleClipReset} isReset />}
        </Group>
      </Stack>
    </>
  );
}
