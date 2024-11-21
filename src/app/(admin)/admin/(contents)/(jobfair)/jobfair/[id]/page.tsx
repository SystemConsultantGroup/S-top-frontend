import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";

export default function AdminJobFairEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="잡페어 영상 수정" />
      <JobInterviewEditFrom jobInterviewID={parseInt(params.id)}></JobInterviewEditFrom>
    </>
  );
}
