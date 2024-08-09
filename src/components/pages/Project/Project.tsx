import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { Header } from "@/components/common/Header";
import { SearchInput } from "@/components/common/SearchInput";
import { Stack, Group } from "@mantine/core";
import { useReducer } from "react";
import styles from "./Project.module.css";
import { DropdownList, filterReducer } from "./ProjectFilter";
import { FilterChip } from "@/components/common/FilterChips/FilterChip";

export function Project() {
  const [filter, dispatch] = useReducer(filterReducer, []);

  const handleYear = (value: string) => {
    dispatch({ type: "ADD", payload: { category: "YEAR", label: value } });
  };
  const handleKind = (value: string) => {
    dispatch({ type: "ADD", payload: { category: "KIND", label: value } });
  };
  const handleField = (value: string) => {
    dispatch({ type: "ADD", payload: { category: "FIELD", label: value } });
  };
  console.log(handleYear, handleKind, handleField);

  return (
    <>
      <Header />
      {/* Banner */}
      <div className={styles.container}>
        {/* Project Selection Tab */}
        <Stack className={styles.filterBox}>
          <SearchInput />
          <Group justify="space-between">
            {DropdownList.map((item, idx) => (
              <Dropdown key={idx} {...item} />
            ))}
          </Group>
          <Group>
            {filter.map((item, idx) => {
              const onRemove = () => {
                dispatch({
                  type: "DELETE",
                  payload: { category: item.category, label: item.label },
                });
              };
              return <FilterChip key={idx} label={item.label} onRemove={onRemove} />;
            })}
          </Group>
        </Stack>
      </div>
    </>
  );
}
