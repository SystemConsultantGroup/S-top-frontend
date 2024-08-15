"use client";

import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import styles from "./styles.module.css";
import { NoticeDetail } from "@/components/common/NoticeDetail";
import { getUserNoticeDetail } from "./GetUserNoticeDetail";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NoticeDetailPage() {
  const segment = useSelectedLayoutSegment();

  const { children, ...othersDetailProps } = getUserNoticeDetail(segment);

  return (
    <>
      <SubHeadNavbar title="Info Desk" />
      <div className={styles.container}>
        <NoticeDetail heading="공지사항" {...othersDetailProps}>
          {children}
        </NoticeDetail>
      </div>
    </>
  );
}
