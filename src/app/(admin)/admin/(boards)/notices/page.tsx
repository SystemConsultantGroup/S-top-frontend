import { PageHeader } from "@/components/common/PageHeader";
import { AdminNoticeListSection } from "@/components/pages/AdminNoticeListSection";

export default function AdminNoticesPage() {
  return (
    <main>
      <PageHeader title={"공지사항 게시판 관리"} />
      <AdminNoticeListSection />
    </main>
  );
}
