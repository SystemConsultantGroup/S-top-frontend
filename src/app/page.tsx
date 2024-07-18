import { MockProjectData } from "@/components/common/ProjectCard/_mock/mock-project";
import { ProjectCard } from "@/components/common/ProjectCard/ProjectCard";

export default function Home() {
  const data = MockProjectData;
  return (
    <main>
      <ProjectCard data={data} />
    </main>
  );
}
