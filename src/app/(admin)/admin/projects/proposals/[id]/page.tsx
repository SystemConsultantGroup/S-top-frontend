import { PageHeader } from "@/components/common/PageHeader";
import { AdminInquiriesEditForm } from "@/components/pages/AdminInquiriesEditForm/AdminInquiriesEditForm";

export default function AdminInquiriesPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <PageHeader title={"과제 제안 답변"} />
      <AdminInquiriesEditForm id={params.id} proposal={true} />
    </main>
  );
}
