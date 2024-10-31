import { INoticeHeading, INoticeHandler } from "@/types/PageBoardTypes";
import { Group, Select, Input, CloseButton, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "../Noticeboard.module.css";

type NoticeHeadingProps = INoticeHeading & INoticeHandler;

export function NoticeHeading({
  inputValue,
  handleInput,
  handleKeyDown,
  handleSelect,
  handleSubmit,
  heading,
  classifier: { data, defaultLabel, searchPlaceholder },
}: NoticeHeadingProps) {
  return (
    <div className={styles.heading}>
      <h2>{heading}</h2>
      <Group gap={10}>
        <Select
          className={styles.filterInput}
          radius={0}
          data={data}
          defaultValue={data[defaultLabel].value}
          comboboxProps={{
            shadow: "md",
            dropdownPadding: 0,
            radius: 0,
            offset: 0,
            styles: { option: { borderRadius: 0, padding: "12px 14px" } },
          }}
          allowDeselect={false}
          withCheckIcon={false}
          onChange={handleSelect}
        />
        <Group gap={0}>
          <Input
            className={styles.searchInput}
            placeholder={searchPlaceholder ?? "검색어를 입력하세요."}
            // onChange={(event) => setValue(event.currentTarget.value)}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rightSectionPointerEvents="all"
            mt="md"
            rightSection={
              <CloseButton
                onClick={(e) => handleInput(e, "CLEAR")}
                style={{ display: inputValue ? undefined : "none" }}
              />
            }
          />
          <Button className={styles.searchButton} variant="filled" onClick={handleSubmit}>
            <IconSearch />
          </Button>
        </Group>
      </Group>
    </div>
  );
}
