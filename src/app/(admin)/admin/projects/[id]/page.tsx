import { PageHeader } from "@/components/common/PageHeader";
import { ProjectCreateSection } from "@/components/pages/AdminProjectsEditSection/ProjectCreateSection";

export default function AdminProjectDetailPage({
  params: { id: projectId },
}: {
  params: { id: number };
}) {
  return (
    <main>
      <PageHeader title={"프로젝트 관리"} />
      <ProjectCreateSection projectId={projectId} />
    </main>
  );
}
