import { ProjectCreateSection } from "@/components/pages/AdminProjectsEditSection/ProjectCreateSection";

export default function AdminProjectDetailPage({
  params: { id: projectId },
}: {
  params: { id: number };
}) {
  return (
    <main>
      <ProjectCreateSection projectId={projectId} />
    </main>
  );
}
