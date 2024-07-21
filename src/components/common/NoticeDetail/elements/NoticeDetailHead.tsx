import { Group } from "@mantine/core";
import styles from "../NoticeDetail.module.css";
import { IconPinFilled } from "@tabler/icons-react";

export interface IDetailHeadProps {
  title: string;
  author: string;
  created_date: Date;
  edited_date?: Date;
  pinned: boolean;
}

export function NoticeDetailHead({
  title,
  author,
  created_date,
  edited_date,
  pinned,
}: IDetailHeadProps) {
  const CreatedDate = formatDate(created_date);
  const EditedDate = edited_date ? formatDate(edited_date) : null;

  return (
    <div className={styles.head}>
      <Group gap={10}>
        {pinned ? <IconPinFilled className={styles.primaryFilledPin} /> : null}
        <h3>{title}</h3>
      </Group>
      <Group className={`${styles.info} ${pinned ? styles.ml35 : ""}`} justify="space-between">
        <span>{author}</span>
        <Group gap={5}>
          <span>작성일시 {CreatedDate}</span>
          {EditedDate ? <span>수정일시 {EditedDate}</span> : ""}
        </Group>
      </Group>
    </div>
  );
}

function formatDate(dateValue: Date): string {
  return dateValue.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
}
