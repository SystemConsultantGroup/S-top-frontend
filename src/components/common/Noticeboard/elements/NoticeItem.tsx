import Link from "next/link";
import styles from "../Noticeboard.module.css";
import { Group } from "@mantine/core";
import { IconPinFilled } from "@tabler/icons-react";
import { IBoardItem } from "../Noticeboard";

export function NoticeItem({ title, number, author, date, view, pinned, href }: IBoardItem) {
  const Year = date.getFullYear();
  const Month = 1 + date.getMonth();
  const Date = date.getDate();

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
        <span>
          {Year}. {Month}. {Date}
        </span>
        <span>조회수 {view}</span>
      </Group>
    </li>
  );
}
