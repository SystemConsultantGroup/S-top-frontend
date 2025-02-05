import { ProjectDetailInfo } from "@/components/pages/ProjectDetail";
import classes from "./page.module.css";

interface Props {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params: { id } }: Props) {
  return (
    <div className={classes.container}>
      <ProjectDetailInfo projectId={id} />
    </div>
  );
}
