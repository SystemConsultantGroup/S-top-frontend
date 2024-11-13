import { PageHeader } from "@/components/common/PageHeader";
import { AdminNoticeListSection } from "@/components/pages/AdminNoticeListSection";

export default function AdminEventNoticesPage() {
  return (
    <main>
      <PageHeader title={"이벤트 공지사항 게시판 관리"} />
      <AdminNoticeListSection event />
    </main>
  );
}
