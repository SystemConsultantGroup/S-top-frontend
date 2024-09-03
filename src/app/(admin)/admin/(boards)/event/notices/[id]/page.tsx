import { PageHeader } from "@/components/common/PageHeader";
import { AdminNoticeEditForm } from "@/components/pages/AdminNoticeEditForm";

export default function AdminEventNoticeEditPage({
  params: { id: noticeId },
}: {
  params: { id: number };
}) {
  return (
    <main>
      <PageHeader title={"이벤트 공지사항 게시글 등록"} />
      <AdminNoticeEditForm noticeId={noticeId} event />
    </main>
  );
}
