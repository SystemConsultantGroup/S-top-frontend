import { PageHeader } from "@/components/common/PageHeader";
import { JobInterviewEditFrom } from "@/components/pages/JobInterviewForm";
export default function AdminJobFairCreate() {
  return (
    <>
      <PageHeader title="잡페어 영상 등록" />
      <JobInterviewEditFrom></JobInterviewEditFrom>
    </>
  );
}
