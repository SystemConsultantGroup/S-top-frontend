import { PageHeader } from "@/components/common/PageHeader";
import { AdminApplicationListSection } from "@/components/pages/AdminApplicationListSection";

export default function AdminApplicationPage() {
  return (
    <main>
      <PageHeader title={"가입 신청 관리"} />
      <AdminApplicationListSection />
    </main>
  );
}
