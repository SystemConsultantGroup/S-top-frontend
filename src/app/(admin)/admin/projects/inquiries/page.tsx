import { PageHeader } from "@/components/common/PageHeader";
import AdminInquiriesListSection from "@/components/pages/AdminInquiriesListSection/AdminInquiriesListSection";

export default function AdminInquiriesPage() {
  return (
    <main>
      <PageHeader title={"프로젝트 문의 게시판 관리"} />
      <AdminInquiriesListSection />
    </main>
  );
}
