import { PageHeader } from "@/components/common/PageHeader";
import { AdminInquiriesEditForm } from "@/components/pages/AdminInquiriesEditForm/AdminInquiriesEditForm";

export default function AdminInquiriesPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <PageHeader title={"프로젝트 문의 답변"} />
      <AdminInquiriesEditForm id={params.id} />
    </main>
  );
}
