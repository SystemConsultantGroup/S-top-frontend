"use client";

import { INoticeDetailItem, INoticeDetailNav } from "@/types/PageBoardTypes";
import { IconMenu2, IconPinFilled } from "@tabler/icons-react";
import { Button, Group } from "@mantine/core";
import styles from "./NoticeDetail.module.css";
import { NoticeDetailStage } from "./elements/NoticeDetailStage";
import { NoticeDetailSprint } from "./elements/NoticeDetailSprint";

type NoticeDetailProps = {
  heading: string;
  item: INoticeDetailItem;
  nav: INoticeDetailNav;
  handleDownloadClick: (id: number, name: string) => void;
};

export function NoticeDetail({ heading, item, nav, handleDownloadClick }: NoticeDetailProps) {
  const CreatedDate = formatDate(new Date(item.createdAt ?? "NONE"));
  const EditedDate = formatDate(new Date(item.updatedAt ?? item.createdAt ?? "NONE"));

  const fullPath = window.location.pathname;
  const parentPath = fullPath.substring(0, fullPath.lastIndexOf("/"));

  return (
    <div className={styles.noticedetail}>
      <div className={styles.heading}>
        <h2>{heading}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.head}>
          <Group gap={10}>
            {item.fixed && <IconPinFilled className={styles.primaryFilledPin} />}
            <h3>{item.title}</h3>
          </Group>
          <Group
            className={`${styles.info} ${item.fixed ? styles.ml35 : ""}`}
            justify="space-between"
          >
            <span>{item.authorName ?? "admin"}</span>
            {item.createdAt && (
              <Group gap={5}>
                <span>작성일시 {CreatedDate}</span>
                {CreatedDate === EditedDate ? "" : <span>수정일시 {EditedDate}</span>}
              </Group>
            )}
          </Group>
        </div>
        <NoticeDetailStage
          content={item.content}
          files={item.files}
          handleDownloadClick={handleDownloadClick}
        />
        <NoticeDetailSprint prev_page={nav.prev_page} next_page={nav.next_page} />
        <Group className={styles.toolbar} justify="start">
          <Button
            className={styles.outlineTool}
            leftSection={<IconMenu2 />}
            variant="outline"
            radius={0}
            component="a"
            href={parentPath}
          >
            목록
          </Button>
        </Group>
      </div>
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
