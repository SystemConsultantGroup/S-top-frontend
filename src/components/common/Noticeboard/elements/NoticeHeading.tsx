import { Button, CloseButton, Group, Input, Select } from "@mantine/core";
import styles from "../Noticeboard.module.css";
import { IconSearch } from "@tabler/icons-react";
import { IBoardHeadingProps } from "../Noticeboard";

interface IBoardSelectState {
  value: string;
  setValue: (value: string) => void;
}

export function NoticeHeading({
  value,
  setValue,
  heading,
  classifier: { labels, defaultLabel, searchPlaceholder },
}: IBoardSelectState & IBoardHeadingProps) {
  return (
    <div className={styles.heading}>
      <h2>{heading}</h2>
      <Group gap={10}>
        <Select
          className={styles.filterInput}
          radius={0}
          data={labels}
          defaultValue={labels[defaultLabel]}
          comboboxProps={{
            shadow: "md",
            dropdownPadding: 0,
            radius: 0,
            offset: 0,
            styles: { option: { borderRadius: 0, padding: "12px 14px" } },
          }}
          allowDeselect={false}
          withCheckIcon={false}
        />
        <Group gap={0}>
          <Input
            className={styles.searchInput}
            placeholder={searchPlaceholder ?? "검색어를 입력하세요."}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            mt="md"
            rightSection={
              <CloseButton
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
          />
          <Button className={styles.searchButton} variant="filled">
            <IconSearch />
          </Button>
        </Group>
      </Group>
    </div>
  );
}
