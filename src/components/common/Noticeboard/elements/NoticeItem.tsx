import { INoticeAllItem } from "@/types/PageBoardTypes";
import { Group } from "@mantine/core";
import { IconPinFilled } from "@tabler/icons-react";
import Link from "next/link";
import styles from "../Noticeboard.module.css";

export function NoticeItem({
  id,
  title,
  hitCount,
  fixed,
  authorName, // AUTHOR inquires
  name, // AUTHOR proposals
  createdAt, // CREATED_AT notices
  createdDate, // CREATED_AT inquires, proposals
  updatedAt,
}: INoticeAllItem) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(createdAt ?? createdDate ?? updatedAt ?? "NONE"));

  const fullPath = window.location.pathname;

  return (
    <li className={styles.item}>
      <Group className={styles.top} gap={10}>
        {fixed && <IconPinFilled className={styles.primaryFilledPin} />}
        <Link className={styles.title} href={`${fullPath}/${id}`}>
          {title}
        </Link>
      </Group>
      <Group className={styles.bottom} gap={10}>
        <span>#{id}</span>
        <span>{authorName ?? name ?? "admin"}</span>
        {(createdAt || createdDate || updatedAt) && <span>{formattedDate}</span>}
        {hitCount && <span>조회수 {hitCount}</span>}
      </Group>
    </li>
  );
}
