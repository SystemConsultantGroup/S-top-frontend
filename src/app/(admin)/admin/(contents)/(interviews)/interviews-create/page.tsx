import { PageHeader } from "@/components/common/PageHeader";
import { InterviewEditFrom } from "@/components/pages/InterviewForm";
export default function AdminTalkCreate() {
  return (
    <>
      <PageHeader title="대담 영상 등록" />
      <InterviewEditFrom></InterviewEditFrom>
    </>
  );
}
