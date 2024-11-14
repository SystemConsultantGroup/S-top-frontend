import { INoticeAllItem } from "@/types/PageBoardTypes";
import { Group } from "@mantine/core";
import { IconPinFilled } from "@tabler/icons-react";
import Link from "next/link";
import styles from "../Noticeboard.module.css";

export function NoticeItem({ id, title, hitCount, fixed, updatedAt }: INoticeAllItem) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(updatedAt));

  const fullPath = window.location.pathname;

  return (
    <li className={styles.item}>
      <Group className={styles.top} gap={10}>
        {fixed ? <IconPinFilled className={styles.primaryFilledPin} /> : null}
        <Link className={styles.title} href={`${fullPath}/${id}`}>
          {title}
        </Link>
      </Group>
      <Group className={styles.bottom} gap={10}>
        <span>#{id}</span>
        <span>admin</span>
        <span>{formattedDate}</span>
        <span>조회수 {hitCount}</span>
      </Group>
    </li>
  );
}
