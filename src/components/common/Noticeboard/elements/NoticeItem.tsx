import { INoticeAllItem } from "@/types/PageBoardTypes";
import { Group } from "@mantine/core";
import { IconPinFilled } from "@tabler/icons-react";
import Link from "next/link";
import styles from "../Noticeboard.module.css";

export function NoticeItem({ title, number, author, date, view, pinned, href }: INoticeAllItem) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return (
    <li className={styles.item}>
      <Group className={styles.top} gap={10}>
        {pinned ? <IconPinFilled className={styles.primaryFilledPin} /> : null}
        <Link className={styles.title} href={href}>
          {title}
        </Link>
      </Group>
      <Group className={styles.bottom} gap={10}>
        <span>#{number}</span>
        <span>{author}</span>
        <span>{formattedDate}</span>
        <span>조회수 {view}</span>
      </Group>
    </li>
  );
}
