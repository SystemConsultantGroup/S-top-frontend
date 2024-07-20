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
  classifier,
}: IBoardSelectState & IBoardHeadingProps) {
  const Labels = classifier.labels;
  const DefaultLabel = classifier.defaultLabel;
  const SearchPlaceholder = classifier.searchPlaceholder;

  return (
    <div className={styles.heading}>
      <h2>{heading}</h2>
      <Group>
        <Select
          className={styles.filterInput}
          data={Labels}
          defaultValue={DefaultLabel ? Labels[DefaultLabel] : null}
          comboboxProps={{ shadow: "md" }}
          allowDeselect={false}
          withCheckIcon={false}
        />
        <Group gap={0}>
          <Input
            className={styles.searchInput}
            placeholder={SearchPlaceholder ?? "검색어를 입력하세요."}
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
