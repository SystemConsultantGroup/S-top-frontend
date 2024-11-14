import { INoticeHeading, INoticeContent, INoticeHandler } from "@/types/PageBoardTypes";
import { Group, Input, Select } from "@mantine/core";
import { NoticeItem } from "./elements/NoticeItem";
import styles from "./Noticeboard.module.css";

type NoticeboardProps = INoticeHeading & INoticeContent & INoticeHandler;

export function Noticeboard({
  handleInput,
  handleSelect,
  heading,
  classifier: { data, defaultLabel, searchPlaceholder },
  items,
}: NoticeboardProps) {
  return (
    <>
      <div className={styles.heading}>
        <h2>{heading}</h2>
        <Group gap={10}>
          <Select
            classNames={{
              input: styles.filterInput,
              dropdown: styles.filterDropdown,
              option: styles.filterOption,
            }}
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
              classNames={{
                wrapper: styles.searchWrapper,
                input: styles.searchInput,
              }}
              placeholder={searchPlaceholder ?? "검색어를 입력하세요."}
              onChange={handleInput}
            />
          </Group>
        </Group>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <ul>
            {items && items.length ? (
              items.map((item, key) => <NoticeItem key={key} {...item} />)
            ) : (
              <li className={styles.item}>
                <span>공지사항이 없습니다.</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
