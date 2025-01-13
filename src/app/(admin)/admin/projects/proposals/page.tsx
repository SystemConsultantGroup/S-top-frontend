import { PageHeader } from "@/components/common/PageHeader";
import AdminProposalsListSection from "@/components/pages/AdminProposalsListSection/AdminProposalsListSection";

export default function AdminProposalsPage() {
  return (
    <main>
      <PageHeader title={"과제 제안 게시판 관리"} />
      <AdminProposalsListSection />
    </main>
  );
}
