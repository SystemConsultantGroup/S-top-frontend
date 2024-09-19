"use client";

import { NoticeDetail } from "@/components/common/NoticeDetail";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import styles from "@/styles/UserBoard.module.css";
import { useSelectedLayoutSegment } from "next/navigation";
import { getUserEventDetail } from "./GetUserEventDetail";

export default function EventNoticeDetailPage() {
  const segment = useSelectedLayoutSegment();

  const { children, ...othersDetailProps } = getUserEventDetail(segment);

  return (
    <>
      <SubHeadNavbar title="Events" />
      <div className={styles.container}>
        <NoticeDetail heading="이벤트 공지사항" {...othersDetailProps}>
          <pre>{children}</pre>
        </NoticeDetail>
      </div>
    </>
  );
}
