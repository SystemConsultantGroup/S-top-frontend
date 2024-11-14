import { ProjectDetailInfo } from "@/components/pages/ProjectDetail";
import classes from "./page.module.css";
import { ProjectDetailInquiry } from "@/components/pages/ProjectDetail/ProjectDetailInquiry";

interface Props {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params: { id } }: Props) {
  return (
    <div className={classes.container}>
      <ProjectDetailInfo projectId={id} />
      <ProjectDetailInquiry projectId={id} />
    </div>
  );
}
