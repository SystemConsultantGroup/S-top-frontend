import { FilterChip } from "@/components/common/FilterChips/FilterChip";
import { Header } from "@/components/common/Header";
import { SearchInput } from "@/components/common/SearchInput";
import { Stack, Group } from "@mantine/core";
import { useReducer } from "react";
import { DropdownList } from "./elements/DropdownList";
import { filterReducer, ADD, DELETE, RESET } from "./filterReducer";
import styles from "./Project.module.css";

export function Project() {
  const [filter, dispatch] = useReducer(filterReducer, []);

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
      <Header />
      {/* Banner */}
      <div className={styles.container}>
        {/* Project Selection Tab */}
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
            {filter.map((item, idx) => {
              const onRemove = () => {
                dispatch({
                  type: DELETE,
                  payload: { category: item.category, label: item.label },
                });
              };
              return <FilterChip key={idx} label={item.label} onRemove={onRemove} />;
            })}
            {filter.length && <FilterChip label="전체해제" onRemove={handleClipReset} isReset />}
          </Group>
        </Stack>
      </div>
    </>
  );
}
