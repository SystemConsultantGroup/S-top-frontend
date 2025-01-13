import { PageHeader } from "@/components/common/PageHeader";
import { AdminProjectsEditSection } from "@/components/pages/AdminProjectsEditSection";

export default function AdminProjectCreatePage() {
  return (
    <main>
      <PageHeader title={"프로젝트 등록"} />
      <AdminProjectsEditSection />
    </main>
  );
}
