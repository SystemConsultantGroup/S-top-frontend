import { PageHeader } from "@/components/common/PageHeader";
import { AdminNoticeEditForm } from "@/components/pages/AdminNoticeEditForm";

export default function AdminEventNoticeCreatePage() {
  return (
    <main>
      <PageHeader title={"공지사항 게시글 등록"} />
      <AdminNoticeEditForm event />
    </main>
  );
}
