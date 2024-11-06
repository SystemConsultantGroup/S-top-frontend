import { PageHeader } from "@/components/common/PageHeader";
import { AdminNoticeEditForm } from "@/components/pages/AdminNoticeEditForm";

export default function AdminNoticeCreatePage() {
  return (
    <main>
      <PageHeader title={"공지사항 게시글 등록"} />
      <AdminNoticeEditForm />
    </main>
  );
}
