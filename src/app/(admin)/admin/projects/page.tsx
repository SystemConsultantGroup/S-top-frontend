import { PageHeader } from "@/components/common/PageHeader";
import { AdminProjectsListSection } from "@/components/pages/AdminProjectsListSection/AdminProjectsListsSection";

export default function AdminProjectsPage() {
  return (
    <main>
      <PageHeader title={"프로젝트 관리"} />
      <AdminProjectsListSection />
    </main>
  );
}
