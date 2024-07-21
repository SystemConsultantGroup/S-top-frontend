import styles from "../NoticeDetail.module.css";
import { Group } from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

export interface IPageInfo {
  title: string;
  url: string;
}

export interface IDetailSprintProps {
  prev_page?: IPageInfo;
  next_page?: IPageInfo;
}

export function NoticeDetailSprint({ prev_page, next_page }: IDetailSprintProps) {
  return (
    <div className={styles.sprint}>
      <Group className={styles.moveBox} gap={30}>
        <Group gap={15}>
          <IconChevronUp />
          <span>이전글</span>
        </Group>
        <Link href={prev_page?.url || ""}>{prev_page?.title || "이전 글이 없습니다."}</Link>
      </Group>
      <Group className={styles.moveBox} gap={30}>
        <Group gap={15}>
          <IconChevronDown />
          <span>다음글</span>
        </Group>
        <Link href={next_page?.url || ""}>{next_page?.title || "다음 글이 없습니다."}</Link>
      </Group>
    </div>
  );
}
